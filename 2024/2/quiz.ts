import * as fs from "node:fs";
import * as path from "node:path";

function quiz() {
  const data = fs.readFileSync(
      path.resolve(__dirname, "./data.txt"),
      "utf-8",
  );
  const spaceRe = /\s+/;
  const levels = data
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((report) => report.split(spaceRe).map((level) => parseInt(level, 10)));

  let correctReports = 0;

  const test = (testFunc: (first: number, second: number) => boolean, hasIncorrectReports: boolean) => {
    return (value: number, index: number, array: number[]) => {
      if (index === 0) {
        return true;
      }
      if (!testFunc(array[index - 1], value) && hasIncorrectReports) {
        return false;
      }
      const diff = Math.abs(value - array[index - 1]);
      if (diff <= 3 && diff > 0) {
        return true;
      } else if (hasIncorrectReports) {
        return false;
      }
      array.splice(index, 1);
      return array.every(test(testFunc, true));
    };
  };

  levels.forEach((level, index) => {
    console.log(`Report ${index + 1}`);
    const copy = level.slice();
    const isIncreasing = level.every(test((first, second) => first <= second, false));
    if (isIncreasing) {
      console.log(`Report ${index + 1} is correct`);
      correctReports += 1;
      return;
    }
    const isDecreasing = copy.every(test((first, second) => first >= second, false));

    if (isIncreasing || isDecreasing) {
      console.log(`Report ${index + 1} is correct`);
      correctReports += 1;
    }
  });
  console.log(`Correct reports: ${correctReports}`);
}

quiz();
