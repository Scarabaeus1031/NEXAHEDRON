from __future__ import annotations

import json
import os
import unittest
from unittest.mock import patch

from services.orion_transport.server import _authorized, execute_envelope


def request_payload(*, mode: str = "understand", version: str = "1", resolved: bool = True):
    object_version = "1" if resolved else "unknown"
    return {
        "schema_version": "orion.orientation-request/1.0",
        "request_id": "request-live-integration",
        "request_version": version,
        "mode": mode,
        "requested_by": {
            "requester_id": "human-request-live-integration",
            "requester_kind": "human",
            "authority_domain": "nexahedron.orientation-laboratory",
        },
        "human_authority": {
            "human_ref": "human-request-live-integration",
            "authority_scope": ["intention", "scope", "continuation"],
        },
        "orientation_objects": [{
            "object_id": "object-request-live-integration",
            "object_version": object_version,
            "object_kind": "Research Paper",
            "source_owner": "unknown",
            "source_ref": "https://example.test/paper",
            "source_revision": object_version,
            "identity_scope": "external",
            "representation_refs": [],
            "integrity_ref": None,
            "access_status": "available" if resolved else "unknown",
            "provenance_gaps": None,
        }],
        "intention": {
            "direction": "Understand the central claim.",
            "focus": "central claim",
            "success_boundary": "The claim and support are visible.",
        },
        "scope": {
            "include": ["central claim"],
            "exclude": ["implementation"],
            "unresolved": [],
            "depth": "focused",
            "breadth": None,
            "time_boundary": None,
        },
        "effects": "none",
        "audience": None,
        "constraints": [],
        "evidence_policy": None,
        "representation_preferences": [],
        "depth_budget": None,
        "prior_report_refs": [],
        "human_annotations": ["A Human note"],
        "clarification_of": None,
        "continuation_of": None,
        "mode_parameters": {},
        "consumer_context": {},
    }


def evidence_payload():
    return {
        "schema_version": "orion.evidence-reference/1.0",
        "evidence_id": "evidence-live-integration",
        "evidence_version": "1",
        "source": {
            "source_id": "source-live-integration",
            "source_version": "1",
            "identity_domain": "external.web",
            "source_owner": "unknown",
            "source_ref": "https://example.test/paper",
            "fragment_ref": "section:claim",
            "integrity_ref": None,
        },
        "authority": {
            "authority_owner": "unknown",
            "authority_domain": "external.web",
            "editorial_status": "unknown",
            "authority_version": "1",
            "declared_at": None,
        },
        "evidence_class": "observed",
        "relationship": "supports",
        "provenance": [{
            "step_id": "source-step-live-integration",
            "step_kind": "source",
            "input_refs": [],
            "output_ref": "https://example.test/paper#section:claim@1",
            "owner": "unknown",
            "lossiness": "none",
            "contract_id": None,
            "contract_version": None,
        }],
        "validation": {
            "status": "valid",
            "checks": ["source_resolved", "version_resolved", "fragment_resolved"],
            "issues": [],
            "validated_against": ["orion.evidence-reference/1.0"],
        },
        "traceability": [{
            "report_id": "report-request-live-integration-1",
            "report_version": "1",
            "target_path": "mode_payload.content.claims_and_support[0]",
            "finding_id": "finding-live-integration",
        }],
        "access_status": "available",
        "evidence_level": None,
        "evidence_scale_id": None,
        "evidence_scale_version": None,
    }


class OrionTransportIntegrationTests(unittest.TestCase):
    def test_production_authentication_fails_closed_without_exposing_credentials(self):
        with patch.dict(
            os.environ,
            {
                "ORION_GATEWAY_REQUIRE_AUTH": "1",
                "ORION_GATEWAY_BEARER_TOKEN": "test-secret",
            },
            clear=True,
        ):
            self.assertFalse(_authorized("Bearer wrong"))
            self.assertTrue(_authorized("Bearer test-secret"))

        with patch.dict(
            os.environ,
            {
                "ORION_GATEWAY_REQUIRE_AUTH": "1",
                "ORION_GATEWAY_CREDENTIALS_JSON": '{"nexahedron":"test-secret"}',
            },
            clear=False,
        ):
            self.assertFalse(_authorized(None))
            self.assertFalse(_authorized("Bearer wrong"))
            self.assertTrue(_authorized("Bearer test-secret"))

        with patch.dict(
            os.environ,
            {"ORION_GATEWAY_REQUIRE_AUTH": "1"},
            clear=True,
        ):
            self.assertFalse(_authorized("Bearer test-secret"))

    def test_real_gateway_returns_complete_report_and_exact_evidence(self):
        status, body = execute_envelope({"request": request_payload(), "evidence": [evidence_payload()]})
        self.assertEqual(status, 200)
        self.assertEqual([item["schema_version"] for item in body["contracts"]], [
            "orion.orientation-report/1.0",
            "orion.continuation-option/1.0",
        ])
        self.assertEqual(body["contracts"][0]["status"], "complete")
        self.assertEqual(json.loads(json.dumps(body["evidence"])), [evidence_payload()])

    def test_real_gateway_returns_blocked_report_without_evidence(self):
        status, body = execute_envelope({"request": request_payload(), "evidence": []})
        self.assertEqual(status, 200)
        self.assertEqual(body["contracts"][0]["status"], "blocked")
        self.assertEqual(body["evidence"], [])

    def test_real_gateway_clarification_preserves_context_and_exposes_lineage_blocker(self):
        status, body = execute_envelope({"request": request_payload(resolved=False), "evidence": []})
        self.assertEqual(status, 409)
        clarification = body["contracts"][1]
        self.assertEqual(clarification["schema_version"], "orion.clarification-result/1.0")
        self.assertTrue(clarification["retained_context"]["intention"])

        revised = request_payload(version="2")
        revised["clarification_of"] = {
            "result_id": clarification["result_id"],
            "result_version": clarification["result_version"],
        }
        status, body = execute_envelope({"request": revised, "evidence": []})
        self.assertEqual(status, 422)
        self.assertEqual(body["contracts"][0]["kind"], "validation_failed")
        self.assertEqual(body["contracts"][0]["reason_code"], "runtime_outcome_invalid")
        self.assertEqual(body["request"]["request_version"], "2")

    def test_real_gateway_returns_unsupported_without_substitution(self):
        status, body = execute_envelope({"request": request_payload(mode="compare"), "evidence": []})
        self.assertEqual(status, 501)
        self.assertEqual(body["contracts"][0]["kind"], "unsupported")


if __name__ == "__main__":
    unittest.main()
