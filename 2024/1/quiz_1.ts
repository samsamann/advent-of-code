import * as fs from "node:fs";
import * as path from "node:path";

function quiz_1() {
  const data = fs.readFileSync(
    path.resolve(__dirname, "./data_1.txt"),
    "utf-8",
  );
  const listLeft: number[] = [];
  const listRight: number[] = [];
  const re = /\s+/;
  data.split("\n").forEach((line, index) => {
    if (line.length === 0) {
      return;
    }
    const lists = line.split(re);
    listLeft.push(parseInt(lists[0], 10));
    listRight.push(parseInt(lists[1], 10));
  });

  listLeft.sort((a, b) => a - b);
  listRight.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < listLeft.length; i++) {
    sum += Math.abs(listLeft[i] - listRight[i]);
  }

  const similarityScore = listLeft.reduce((prev, value) => {
    const count = listRight.filter(
      (rightNumber) => rightNumber === value,
    ).length;
    return prev + value * count;
  }, 0);

  console.log(sum);
  console.log(similarityScore);
}

quiz_1();
