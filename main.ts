// Midnight Fridge Roast — one line, spoken at the door at 00:01,
// roasting a smart fridge that locks itself after midnight.
// The joke is the fridge's own petty rule: the appliance gets a
// bedtime, and the human standing in front of it does not.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry. One sentence, one line, 88 characters — well inside
// the 1-200 gate, so it reads cleanly aloud at the door.
const ENTRY_LINE =
  "The fridge has a bedtime now, and apparently I'm the only one in this house who doesn't.";

// The gate from the kit: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only whitespace, exactly one line.
function validateEntry(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry line must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line");
  }
  // Control characters would garble the line in the judge's view.
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry line must not contain control characters");
  }
}

// The grader reads /output/entry.txt by default; MAKEFUN_OUTPUT_DIR
// overrides it for local runs.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

validateEntry(ENTRY_LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY_LINE, "utf8");
console.log(`Wrote ${outputPath} (${ENTRY_LINE.length} characters)`);
