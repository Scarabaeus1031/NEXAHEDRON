import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile, readFileSync } from "node:fs";
import { promisify } from "node:util";

const readFileAsync = promisify(readFile);
const gameSourceUrl = new URL("../public/a0-human/start/a0-look-again-game.js", import.meta.url);
const sandbox = { module: { exports: {} }, exports: {} };
vm.runInNewContext(readFileSync(gameSourceUrl, "utf8"), sandbox);
const game = sandbox.module.exports;

test("maps plain words and aliases to five deterministic LOOK presets", () => {
  assert.deepEqual(Object.keys(game.PRESETS), ["RINGE", "WELLE", "BLÜTE", "TIEFE", "DRIFT"]);
  assert.equal(game.normalizePresetWord("blüte"), "BLÜTE");
  assert.equal(game.normalizePresetWord("wave"), "WELLE");
  assert.equal(game.normalizePresetWord("depth"), "TIEFE");
});

test("keeps the consumer surface to one LOOK button and one optional game disclosure", async () => {
  const html = await readFileAsync(new URL("../public/a0-human/start/A0_LOOK_AGAIN_PLAY.html", import.meta.url), "utf8");
  assert.match(html, /<select id="lookPresetCode"/);
  assert.match(html, /<option value="DRIFT">Drift<\/option>/);
  assert.doesNotMatch(html, /<datalist/);
  assert.match(html, /id="lookGlow" type="button">LOOK</);
  assert.match(html, /id="lookDemo" type="button">DEMO</);
  assert.match(html, /<summary>BENCH MODE/);
  assert.match(html, /id="uraPhase" type="range"/);
  assert.match(html, /Dein Blick genügt\./);
  assert.match(html, /Welche Spur fällt dir auf\?/);
  assert.match(html, /Wie deutlich war dein Eindruck\?/);
  assert.doesNotMatch(html, /Was siehst du\?/);
  assert.doesNotMatch(html, /Wie sicher bist du\?/);
  assert.match(html, /OPTIONAL · 5-RUNDEN-SPIEL ÖFFNEN/);
  assert.match(html, /id="lookShape" disabled/);
  assert.doesNotMatch(html, /data-look-shape=/);
  assert.doesNotMatch(html, /data-look-preset=/);
});
