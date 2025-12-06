import { readFile } from '../utils/readFile'

function puzzle4() {
  const data = readFile(4, false)
  const distance = 1

  const checkNeighbors = (
    lastCols: string[][],
    lastCurrentLine: string[],
    nextCurrentLine: string[],
    nextCols: string[][],
    removable: number[],
  ): void => {
    if (nextCurrentLine.length === 0) {
      return
    }
    const roll = nextCurrentLine[0]

    if (roll === '@') {
      const test = [
        ...lastCols.flatMap((col) => col.slice(0, distance)),
        ...lastCurrentLine.slice(0, distance),
        ...nextCurrentLine.slice(1, distance + 1),
        ...nextCols.flatMap((col) => col.slice(0, distance + 1)),
      ]
      if (test.filter((s) => s === '@').length < 4) {
        removable.push(lastCurrentLine.length)
      }
    }

    for (let i = 0; i < nextCols.length; i++) {
      const nextCol = nextCols[i].splice(0, 1)[0]
      if (!lastCols[i]) {
        lastCols.push([])
      }
      if (nextCol) {
        lastCols[i].unshift(nextCol)
      }
    }

    lastCurrentLine.unshift(roll)
    return checkNeighbors(lastCols, lastCurrentLine, nextCurrentLine.slice(1), nextCols, removable)
  }

  const search = (lines: string[], lastLines: string[][], newLines: string[]): number => {
    if (lines.length === 0) {
      return 0
    }
    const currentLine = lines[0].split('')
    if (currentLine.length === 0) {
      return search(lines.slice(1), lastLines.slice(0, distance), newLines)
    }

    const nextLines = lines.slice(1, distance + 1).map((l) => l.split(''))

    const removable: number[] = []
    checkNeighbors([], [], currentLine, [...lastLines, ...nextLines], removable)

    const removed = currentLine.map((c, i) => (removable.includes(i) ? 'x' : c)).join('')
    newLines.push(removed)
    lastLines.unshift(currentLine)
    return removable.length + search(lines.slice(1), lastLines.slice(0, distance), newLines)
  }

  let lines = data.split('\n')

  let countFirstIteration = 0
  let countAll = 0
  let found = true
  do {
    const newLines: string[] = []
    const count = search(lines, [], newLines)
    if (count === 0) {
      found = false
    } else {
      lines = newLines
      if (countFirstIteration === 0) {
        countFirstIteration = count
      }
      countAll += count
    }
  } while (found)

  console.log('Puzzle 4 - Part 1: ', countFirstIteration)
  console.log('Puzzle 4 - Part 2: ', countAll)
}
puzzle4()
