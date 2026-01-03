import { readFile } from '../utils/readFile'

function puzzle5() {
  const data = readFile(5, false)

  const [ranges, ingredients] = data.split(/^\W/gm)
  const rangeLines: [number, number][] = ranges
    .split('\n')
    .filter((l) => l.length > 0)
    .map((line) => {
      const [startStr, endStr] = line.split('-')
      return [parseInt(startStr, 10), parseInt(endStr, 10)]
    })
  rangeLines.sort((a, b) => a[0] - b[0])
  const ingredientIds = ingredients
    .split('\n')
    .filter((l) => l.length > 0)
    .map((line) => parseInt(line, 10))

  let freshCount = 0
  for (const ingredientId of ingredientIds) {
    for (const range of rangeLines) {
      if (ingredientId >= range[0] && ingredientId <= range[1]) {
        freshCount++
        break
      }
    }
  }

  let lastLine = rangeLines.slice(0, 1)[0]
  for (let i = 1; i < rangeLines.length; i++) {
    const currentLine = rangeLines[i]
    if (currentLine[0] < lastLine[1]) {
      rangeLines[i - 1][1] = currentLine[0]
      rangeLines[i][0] = lastLine[1]
    }
    lastLine = currentLine
  }

  let freshListEnd = 0
  let count = 0
  for (const range of rangeLines) {
    let correction = 1
    if (freshListEnd === range[0]) {
      correction = 0
    }
    count += range[1] - range[0] + correction
    console.log(range[1], range[0], range[1] - range[0] + correction)
    freshListEnd = range[1]
  }
  console.log('Puzzle 5 - Part 1: ', freshCount)
  console.log('Puzzle 5 - Part 2: ', count)
}
puzzle5()
