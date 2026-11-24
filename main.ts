import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Cannot Convert a PDF: one satirical sentence about lawmakers who regulate the internet but cannot convert a PDF, at most 320 characters.
// Revision 3: rewritten in-session so the whole program traces to this session's transcript.
const LINE =
  "The committee that regulates the internet cannot convert a PDF, yet it will decide what your AI is allowed to say about it.";
const MAX_CHARS = 320;

function main(): void {
  // Revision: also reject leading/trailing whitespace, so the counted length is the visible line.
  if (LINE.includes("\n") || LINE.trim().length === 0 || LINE.trim() !== LINE) {
    throw new Error("entry must be a single non-empty line without surrounding whitespace");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  // Revision: exactly one sentence — a single terminal period, no sentence break inside.
  const sentences = LINE.split(".").filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be exactly one sentence, found ${sentences.length}`);
  }
  // Revision 2: the single sentence ends with a full stop — reject a line that trails off.
  if (!LINE.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
