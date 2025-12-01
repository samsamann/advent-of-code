import * as fs from "node:fs";
import * as path from "node:path";

function quiz1() {
  const data = fs.readFileSync(
    path.resolve(__dirname, "./example.txt"),
    "utf-8",
  );
  const [rules, updates] = data.split(/\n\n/);
  rules.split(/\n/).map((line) => line.split(/\|/).map((d) => Number(d)));
  updates
    .split(/\n/)
    .map((update) =>
      update
        .split(/,/)
        .filter((s) => s.length > 0)
        .map((d) => Number(d)),
    )
      .filter((u) => u.length > 0)
    .forEach((update) => {
      console.log(update);
    });
}

quiz1();
