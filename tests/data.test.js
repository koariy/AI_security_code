import test from "node:test";
import assert from "node:assert/strict";
import {
  participants,
  vulnerabilities,
  criteria,
  code,
  tools,
} from "../src/data.js";
test("scenario references valid unique findings and aligned scores", () => {
  const ids = new Set(vulnerabilities.map((v) => v.id));
  assert.equal(ids.size, 5);
  for (const v of vulnerabilities)
    assert.ok(v.line > 0 && v.line <= code.length);
  for (const p of participants) {
    assert.equal(new Set(p.found).size, p.found.length);
    assert.ok(p.found.every((id) => ids.has(id)));
    assert.equal(p.scores.length, criteria.length);
    assert.ok(p.scores.every((s) => s >= 0 && s <= 100));
  }
});
test("tool catalogue includes all 12 official HTTPS links", () => {
  assert.equal(Object.values(tools).flat().length, 12);
  for (const tool of Object.values(tools).flat())
    assert.equal(new URL(tool[5]).protocol, "https:");
});
