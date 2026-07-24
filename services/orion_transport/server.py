"""Thin JSON transport for the immutable in-process ORION Version 1 Gateway.

This module owns transport only. It constructs no orientation findings, chooses
no evidence, and imports only ORION's public Gateway and public contracts.
"""

from __future__ import annotations

from dataclasses import asdict
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import sys
from typing import Any, Mapping

from orion.gateway import OrientationGateway
from orion.public_contracts import (
    AuthorityDeclaration,
    EvidenceReference,
    EvidenceValidation,
    IntegrityReference,
    OrientationReport,
    ProvenanceStep,
    SourceReference,
    TraceabilityTarget,
)


MEDIA_TYPE = "application/vnd.orion.contracts+json;version=1.0"
REQUEST_PATH = "/orientation/v1/requests"


def execute_envelope(envelope: Mapping[str, Any]) -> tuple[int, dict[str, Any]]:
    """Invoke the real Gateway and serialize only validated public objects."""

    request = envelope.get("request")
    if not isinstance(request, Mapping):
        return 400, {"transport_error": "request_envelope_invalid"}

    evidence_value = envelope.get("evidence", [])
    if not isinstance(evidence_value, list):
        return 400, {"transport_error": "evidence_envelope_invalid"}
    try:
        evidence = tuple(_evidence_reference(item) for item in evidence_value)
    except (KeyError, TypeError, ValueError):
        return 400, {"transport_error": "evidence_envelope_invalid"}

    response = OrientationGateway().handle(request, evidence)
    contracts = [asdict(contract) for contract in response.contracts]
    reports = tuple(
        contract for contract in response.contracts if isinstance(contract, OrientationReport)
    )
    referenced_evidence = {
        reference for report in reports for reference in report.evidence
    }
    public_evidence = [
        asdict(item)
        for item in evidence
        if f"{item.evidence_id}@{item.evidence_version}" in referenced_evidence
    ]
    return _status_for(response.contracts), {
        "request": asdict(response.request) if response.request is not None else None,
        "contracts": contracts,
        "evidence": public_evidence,
    }


def _status_for(contracts: tuple[object, ...]) -> int:
    report = next((item for item in contracts if isinstance(item, OrientationReport)), None)
    if report is not None:
        return 200
    error = next((item for item in contracts if hasattr(item, "kind")), None)
    kind = getattr(error, "kind", "internal_failure")
    return {
        "clarification_required": 409,
        "invalid": 422,
        "validation_failed": 422,
        "unsupported": 501,
        "blocked": 409,
        "unavailable": 503,
        "internal_failure": 500,
    }.get(kind, 500)


def _evidence_reference(value: object) -> EvidenceReference:
    item = _mapping(value)
    source_value = _mapping(item["source"])
    authority_value = _mapping(item["authority"])
    validation_value = _mapping(item["validation"])
    integrity_value = source_value.get("integrity_ref")
    integrity = None
    if integrity_value is not None:
        nested = _mapping(integrity_value)
        integrity = IntegrityReference(
            str(nested["method"]), str(nested["value"]), str(nested["coverage"]), nested["verified"]
        )
    return EvidenceReference(
        schema_version=str(item["schema_version"]),
        evidence_id=str(item["evidence_id"]),
        evidence_version=str(item["evidence_version"]),
        source=SourceReference(
            source_id=str(source_value["source_id"]),
            source_version=str(source_value["source_version"]),
            identity_domain=str(source_value["identity_domain"]),
            source_owner=str(source_value["source_owner"]),
            source_ref=str(source_value["source_ref"]),
            fragment_ref=_optional_text(source_value.get("fragment_ref")),
            integrity_ref=integrity,
        ),
        authority=AuthorityDeclaration(
            authority_owner=str(authority_value["authority_owner"]),
            authority_domain=str(authority_value["authority_domain"]),
            editorial_status=str(authority_value["editorial_status"]),  # type: ignore[arg-type]
            authority_version=str(authority_value["authority_version"]),
            declared_at=_optional_text(authority_value.get("declared_at")),
        ),
        evidence_class=str(item["evidence_class"]),  # type: ignore[arg-type]
        relationship=str(item["relationship"]),  # type: ignore[arg-type]
        provenance=tuple(_provenance(entry) for entry in _list(item["provenance"])),
        validation=EvidenceValidation(
            status=str(validation_value["status"]),  # type: ignore[arg-type]
            checks=_texts(validation_value["checks"]),
            issues=_texts(validation_value["issues"]),
            validated_against=_texts(validation_value["validated_against"]),
        ),
        traceability=tuple(_traceability(entry) for entry in _list(item["traceability"])),
        access_status=str(item["access_status"]),  # type: ignore[arg-type]
        evidence_level=_optional_text(item.get("evidence_level")),
        evidence_scale_id=_optional_text(item.get("evidence_scale_id")),
        evidence_scale_version=_optional_text(item.get("evidence_scale_version")),
    )


def _provenance(value: object) -> ProvenanceStep:
    item = _mapping(value)
    lossiness = item["lossiness"]
    return ProvenanceStep(
        step_id=str(item["step_id"]),
        step_kind=str(item["step_kind"]),  # type: ignore[arg-type]
        input_refs=_texts(item["input_refs"]),
        output_ref=str(item["output_ref"]),
        owner=str(item["owner"]),
        lossiness=_texts(lossiness) if isinstance(lossiness, list) else str(lossiness),
        contract_id=_optional_text(item.get("contract_id")),
        contract_version=_optional_text(item.get("contract_version")),
    )


def _traceability(value: object) -> TraceabilityTarget:
    item = _mapping(value)
    return TraceabilityTarget(
        report_id=str(item["report_id"]),
        report_version=str(item["report_version"]),
        target_path=str(item["target_path"]),
        finding_id=_optional_text(item.get("finding_id")),
    )


def _mapping(value: object) -> Mapping[str, Any]:
    if not isinstance(value, Mapping):
        raise TypeError("expected mapping")
    return value


def _list(value: object) -> list[Any]:
    if not isinstance(value, list):
        raise TypeError("expected list")
    return value


def _texts(value: object) -> tuple[str, ...]:
    return tuple(str(item) for item in _list(value))


def _optional_text(value: object) -> str | None:
    return None if value is None else str(value)


class OrionTransportHandler(BaseHTTPRequestHandler):
    server_version = "NEXAHEDRON-ORION-Transport/1.0"

    def do_GET(self) -> None:  # noqa: N802
        if self.path != "/health":
            self._write(404, {"transport_error": "not_found"})
            return
        self._write(200, {"status": "available", "orion_contract_version": "1.0"})

    def do_POST(self) -> None:  # noqa: N802
        if self.path != REQUEST_PATH:
            self._write(404, {"transport_error": "not_found"})
            return
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if size <= 0 or size > 2_000_000:
                raise ValueError("invalid content length")
            envelope = json.loads(self.rfile.read(size))
            if not isinstance(envelope, dict):
                raise ValueError("invalid envelope")
            status, body = execute_envelope(envelope)
        except (json.JSONDecodeError, TypeError, ValueError):
            status, body = 400, {"transport_error": "request_body_invalid"}
        self._write(status, body)

    def log_message(self, format: str, *args: object) -> None:
        if os.environ.get("ORION_TRANSPORT_LOG") == "1":
            super().log_message(format, *args)

    def _write(self, status: int, body: Mapping[str, Any]) -> None:
        payload = json.dumps(body, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", MEDIA_TYPE)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)


def main() -> None:
    if "--once" in sys.argv:
        envelope = json.load(sys.stdin)
        status, body = execute_envelope(envelope)
        json.dump({"status": status, "body": body}, sys.stdout, separators=(",", ":"))
        return
    host = os.environ.get("ORION_TRANSPORT_HOST", "127.0.0.1")
    port = int(os.environ.get("ORION_TRANSPORT_PORT", "4317"))
    server = ThreadingHTTPServer((host, port), OrionTransportHandler)
    print(f"ORION Version 1 transport listening on http://{host}:{port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
