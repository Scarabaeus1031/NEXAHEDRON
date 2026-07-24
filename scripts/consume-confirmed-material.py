#!/usr/bin/env python3
"""Consume one Confirmed Material artifact with ORION Representation Alpha."""

from __future__ import annotations

from dataclasses import asdict
from hashlib import sha256
import json
import sys

from orion.representation_alpha import (
    ExactTextRenderer,
    confirmed_source_from_mapping,
    representation_as_dict,
    validate_representation,
)


def fail(message: str) -> int:
    print(f"[Representation Alpha handoff] {message}", file=sys.stderr)
    return 1


def main() -> int:
    confirmed_bytes = sys.stdin.buffer.read()
    if not confirmed_bytes:
        return fail("Confirmed Material input is empty")

    try:
        confirmed_value = json.loads(confirmed_bytes)
        source = confirmed_source_from_mapping(confirmed_value)
        representation = ExactTextRenderer().render(source)
        conformance = validate_representation(source, representation)
    except (TypeError, ValueError, json.JSONDecodeError) as error:
        return fail(str(error))

    checks = {
        "confirmed_profile_accepted":
            source.schema_version == "orion.confirmed-local-source/0.1-alpha",
        "orientation_object_identity_preserved": (
            representation.orientation_object_id,
            representation.orientation_object_version,
        ) == (
            source.orientation_object_id,
            source.orientation_object_version,
        ),
        "source_identity_preserved":
            representation.source.entry_id == source.entry.entry_id
            and representation.source.source_ref == source.entry.source_ref,
        "source_version_preserved":
            representation.source.revision == source.entry.revision,
        "confirmation_identity_preserved":
            representation.provenance[0].step_id == source.confirmation_id,
        "content_integrity_preserved":
            representation.payload.content == source.entry.content
            and representation.payload.content_sha256
            == source.entry.content_sha256,
        "representation_conformant": conformance.valid,
    }
    failed_checks = [name for name, valid in checks.items() if not valid]
    if failed_checks:
        return fail(f"handoff checks failed: {', '.join(failed_checks)}")

    proof = {
        "confirmed_material_sha256": sha256(confirmed_bytes).hexdigest(),
        "handoff_checks": checks,
        "representation": representation_as_dict(representation),
        "representation_conformance": asdict(conformance),
        "stop": "immutable_representation",
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
