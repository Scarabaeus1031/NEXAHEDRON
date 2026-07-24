#!/usr/bin/env python3
"""Validate one Representation-referenced Orientation Request and stop."""

from __future__ import annotations

from dataclasses import asdict
import json
import sys

from orion.gateway.translation import construct_orientation_request
from orion.public_contracts import OrientationRequest
from orion.public_contracts.validation import validate_orientation_request


def fail(message: str) -> int:
    print(f"[Representation-Referenced Request Alpha] {message}", file=sys.stderr)
    return 1


def main() -> int:
    try:
        payload = json.load(sys.stdin)
        request_value = payload["request"]
        representation = payload["representation"]
        request = construct_orientation_request(request_value)
        validation = validate_orientation_request(request)
    except (KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        return fail(str(error))

    if len(request.orientation_objects) != 1:
        return fail("the Alpha proof requires exactly one Orientation Object")

    orientation_object = request.orientation_objects[0]
    integrity = orientation_object.integrity_ref
    expected_representation_ref = (
        f"{representation['representation_id']}"
        f"@{representation['representation_version']}"
    )
    checks = {
        "public_contract_valid": validation.valid,
        "request_model_immutable":
            OrientationRequest.__dataclass_params__.frozen,
        "one_representation_referenced":
            orientation_object.representation_refs
            == (expected_representation_ref,),
        "representation_identity_preserved":
            orientation_object.object_id
            == representation["orientation_object_id"]
            and orientation_object.object_version
            == representation["orientation_object_version"],
        "source_identity_preserved":
            orientation_object.source_owner
            == representation["source"]["owner"]
            and orientation_object.source_ref
            == representation["source"]["source_ref"],
        "source_revision_preserved":
            orientation_object.source_revision
            == representation["source"]["revision"],
        "integrity_preserved":
            integrity is not None
            and integrity.method == "sha256"
            and integrity.value
            == representation["payload"]["content_sha256"]
            and integrity.coverage == "whole"
            and integrity.verified is True,
        "human_authority_explicit":
            request.human_authority.human_ref
            == representation["source"]["owner"]
            and {
                "intention",
                "scope",
                "continuation",
            }.issubset(request.human_authority.authority_scope),
        "human_intention_explicit": bool(request.intention.direction.strip()),
        "human_scope_explicit":
            bool(request.scope.include)
            and request.scope.depth is not None
            and not request.scope.unresolved,
        "effects_none": request.effects == "none",
    }
    failed_checks = [name for name, valid in checks.items() if not valid]
    if failed_checks:
        return fail(f"request checks failed: {', '.join(failed_checks)}")

    proof = {
        "contract_validation": {
            **asdict(validation),
            "valid": validation.valid,
        },
        "lineage_checks": checks,
        "representation_ref": expected_representation_ref,
        "request": asdict(request),
        "stop": "validated_orientation_request",
    }
    print(
        json.dumps(
            proof,
            ensure_ascii=False,
            separators=(",", ":"),
            sort_keys=True,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
