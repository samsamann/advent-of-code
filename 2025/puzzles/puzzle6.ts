import { readFile } from '../utils/readFile'

type Column = {
  part1: number[]
  part2: number[][]
  operator: string
  pos: number
}

function puzzle6() {
  const data = readFile(6, false)
  const lines = data.split('\n').filter((line) => line.length > 0)

  const lastLine = lines.splice(-1, 1)[0]
  const columns: Column[] = []
  let pos = -1
  for (const char of lastLine.split('')) {
    pos++
    if (char === ' ') {
      continue
    }
    columns.push({ part1: [], part2: [], operator: char, pos })
  }

  let column = columns[0]
  for (let i = 1; i <= columns.length; i++) {
    const nextColumnPos = columns[i] ? columns[i].pos -1 : undefined
    for (const line of lines) {
      const linePart = line.slice(column.pos, nextColumnPos)
      column.part1.push(parseInt(linePart.trim(), 10))

      for (let colOffset = 0; colOffset < linePart.length; colOffset++) {
        const char = linePart[colOffset]
        if (char === ' ') {
          continue
        }

        if (!column.part2[colOffset]) {
          column.part2[colOffset] = []
        }
        column.part2[colOffset].push(parseInt(char, 10))
      }
    }
    column = columns[i]
  }

  let grandTotal = 0
  let grandTotalPart2 = 0
  for (const col of columns) {
    grandTotal += calculate(col.operator, col.part1)

    const numbersPart2 = col.part2.map((p) => p.reduce((sum, x, index) => sum * 10 + x, 0))
    grandTotalPart2 += calculate(col.operator, numbersPart2)
  }

  console.log('Puzzle 6 - Part 1: ', grandTotal)
  console.log('Puzzle 6 - Part 2: ', grandTotalPart2)
}

function calculate(operator: string, numbers: number[]): number {
  if (operator === '+') {
    return numbers.reduce((a, b) => a + b, 0)
  } else if (operator === '*') {
    return numbers.reduce((a, b) => a * b, 1)
  } else {
    console.log('Unknown operator: ', operator)
  }
  return 0
}

puzzle6()
