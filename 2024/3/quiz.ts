import * as fs from "node:fs";
import * as path from "node:path";

function quiz1() {
  const data = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf-8");

  const re = /mul\((\d{1,3}),(\d{1,3})\)/gm;
  const array = [...data.matchAll(re)];
  let sum = 0;
  for (const regExpExecArray of array) {
    const [_, a, b] = regExpExecArray;
    sum += Number(a) * Number(b);
  }
  console.log(`Result: ${sum}`);
}

function quiz2() {
  const data = fs.readFileSync(
    path.resolve(__dirname, "./data.txt"),
    "utf-8",
  );

  const re = /mul\((\d{1,3}),(\d{1,3})\)/gm;
  const instrutions = [...data.matchAll(/(do(?:n't)?\(\))/gm)].map((a) => {
    return {
      index: a.index,
      active: a[0] === "do()",
    };
  });
  const array = [...data.matchAll(re)];
  let sum = 0;
  for (const regExpExecArray of array) {
    const [_, a, b] = regExpExecArray;
    const index = regExpExecArray.index;

    const instruction = instrutions
      .sort((a, b) => b.index - a.index)
      .find((data) => data.index < regExpExecArray.index);
    if (instruction === undefined || instruction.active) {
      sum += Number(a) * Number(b);
    }
  }
  console.log(`Result: ${sum}`);
}

quiz1();
quiz2();
