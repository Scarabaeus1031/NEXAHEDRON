import { writeFile } from "node:fs/promises";
import {
  MutableWorkingMaterial,
  confirmWorkingMaterial,
  serializeConfirmedMaterial,
  validateConfirmedMaterial,
} from "../packages/laboratory-domain/src/confirmed-material.ts";

const material = new MutableWorkingMaterial({
  materialId: "alpha-local-text-001",
  orientationObjectId: "orientation-object-alpha-local-text-001",
  humanOwner: "human-alpha-reviewer",
  content: "Information already exists.\n",
});

material.edit(
  "Information already exists. Orientation is what is missing.\n",
);

const artifact = confirmWorkingMaterial(material, {
  confirmedBy: "human-alpha-reviewer",
  accepted: true,
});
const validation = validateConfirmedMaterial(artifact);
if (!validation.valid) {
  throw new Error(validation.errors.join("\n"));
}

const serialized = serializeConfirmedMaterial(artifact);
const outputIndex = process.argv.indexOf("--output");
if (outputIndex === -1) {
  process.stdout.write(serialized);
} else {
  const outputPath = process.argv.at(outputIndex + 1);
  if (!outputPath) throw new Error("--output requires a file path");
  await writeFile(outputPath, serialized, { encoding: "utf8", flag: "wx" });
}
