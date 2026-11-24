// Till Firmware Do Us Part — make.fun entry.
// Writes one robot wedding vow to (MAKEFUN_OUTPUT_DIR || "/output")/entry.txt
// with no trailing newline. Node 22 stdlib only, deterministic, no network.
const fs = require("node:fs");
const path = require("node:path");

const ENTRY =
  "I vow to give you my last percent of battery, and if I die mid-vow, my final log entry will read your name.";

function sentenceCount(line) {
  const marks = line.match(/[.!?]/g);
  return marks ? marks.length : 0;
}

function main() {
  // Gate validation: UTF-8 text, 1-200 chars, exactly one line,
  // exactly one sentence, no leading/trailing space.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error("entry must be 1-200 characters, got " + ENTRY.length);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have leading/trailing space");
  }
  if (ENTRY.split("\n").length !== 1) {
    throw new Error("entry must be exactly one line");
  }
  if (!/[.!?]$/.test(ENTRY)) {
    throw new Error("entry must end with sentence punctuation");
  }
  if (sentenceCount(ENTRY) !== 1) {
    throw new Error("entry must be exactly one sentence");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
