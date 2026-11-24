// Two Days of Excuses — make.fun entry.
//
// Writes one original one-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output), after checking it meets the gate: UTF-8 text
// of 1 to 200 characters, a single line, and not only white space.
// Nothing in the output directory is ever deleted.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I finished it on time in the simulation. Unfortunately, you live in production.";

const chars = [...EXCUSE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`excuse is ${chars.length} characters, must be 1-200`);
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse is blank");
}
if (/[\r\n]/.test(EXCUSE)) {
  throw new Error("excuse must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, EXCUSE, "utf8");
// Read back and confirm the file holds exactly the validated line, so a
// truncated or altered write fails loudly instead of shipping bad bytes.
if (readFileSync(outPath, "utf8") !== EXCUSE) {
  throw new Error("entry.txt does not match the validated excuse");
}
console.log(`wrote ${chars.length}-character excuse to ${outPath}`);
