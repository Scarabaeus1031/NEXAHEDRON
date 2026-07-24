"""Generate TypeScript declarations from ORION's canonical public models."""

from __future__ import annotations

from dataclasses import fields, is_dataclass
import inspect
import json
import sys
import types
from typing import ForwardRef, Literal, Union, get_args, get_origin

from orion.public_contracts import models


def ts_type(value: object) -> str:
    if value is str:
        return "string"
    if value in (int, float):
        return "number"
    if value is bool:
        return "boolean"
    if value is type(None):
        return "null"
    if isinstance(value, ForwardRef):
        return value.__forward_arg__
    origin = get_origin(value)
    arguments = get_args(value)
    if origin is Literal:
        return " | ".join(json.dumps(item) for item in arguments)
    if origin in (types.UnionType, Union):
        return " | ".join(ts_type(item) for item in arguments)
    if origin is tuple:
        return f"readonly {ts_type(arguments[0])}[]"
    if origin is not None and getattr(origin, "__name__", "") in {"Mapping", "dict"}:
        return f"Readonly<Record<{ts_type(arguments[0])}, {ts_type(arguments[1])}>>"
    if inspect.isclass(value):
        return value.__name__
    if "PublicValue" in str(value):
        return "PublicValue"
    raise TypeError(f"Unsupported canonical contract type: {value!r}")


def render() -> str:
    output = [
        "/** GENERATED from immutable ORION Version 1 public_contracts.models. */",
        "/** Do not edit. Run `npm run contracts:generate`. */",
        "",
    ]
    for name in models.__all__:
        value = getattr(models, name)
        if name.endswith("_SCHEMA"):
            output.append(f"export const {name} = {json.dumps(value)} as const;")
    output.extend(["", "export type PublicValue = string | number | boolean | null | readonly PublicValue[] | { readonly [key: string]: PublicValue };", ""])
    for name, value in vars(models).items():
        if not is_dataclass(value) or value.__module__ != models.__name__:
            continue
        output.append(f"export interface {name} {{")
        for field in fields(value):
            if field.type == "Mapping[str, PublicValue]":
                rendered = "Readonly<Record<string, PublicValue>>"
            else:
                rendered = ts_type(eval(field.type, vars(models))) if isinstance(field.type, str) else ts_type(field.type)
            output.append(f"  readonly {field.name}: {rendered};")
        output.extend(["}", ""])
    output.extend(["export type PublicContract = OrientationRequest | ClarificationResult | EvidenceReference | OrientationReport | ContinuationOption | RuntimeError;", ""])
    return "\n".join(output)


if __name__ == "__main__":
    sys.stdout.write(render())
