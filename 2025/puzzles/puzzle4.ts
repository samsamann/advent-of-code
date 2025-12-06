import { readFile } from '../utils/readFile'

function puzzle4() {
  const data = readFile(4, false)

  const checkNeighbors = (
    lastCols: string[][],
    lastCurrentLine: string[],
    nextCurrentLine: string[],
    nextCols: string[][],
    checkFn: (test: string[]) => boolean,
    lookup: number,
  ): number => {
    if (nextCurrentLine.length === 0) {
      return 0
    }
    let count = 0
    const roll = nextCurrentLine[0]

    if (roll === '@') {
      const test = [
        ...lastCols.flatMap((col) => col.slice(0, lookup)),
        ...lastCurrentLine.slice(0, lookup),
        ...nextCurrentLine.slice(1, lookup + 1),
        ...nextCols.flatMap((col) => col.slice(0, lookup + 1)),
      ]
      if (checkFn(test)) {
        count = 1
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
    return (
      count +
      checkNeighbors(
        lastCols,
        lastCurrentLine,
        nextCurrentLine.slice(1),
        nextCols,
        checkFn,
        lookup,
      )
    )
  }

  const search = (
    lines: string[],
    lastLines: string[][],
    lookup: number,
  ): number => {
    if (lines.length === 0) {
      return 0
    }
    const currentLine = lines[0].split('')
    if (currentLine.length === 0) {
      return search(lines.slice(1), lastLines.slice(0, lookup), lookup)
    }

    // console.log('----')
    // console.log('last Line:    ', lastLines.map((l) => l.join(',')).join('\n'))
    // console.log('current Line: ', currentLine.join(','))

    const nextLines = lines.slice(1, lookup + 1).map((l) => l.split(''))
    // console.log('next Line:    ', nextLines.map((l) => l.join(',')).join('\n'))

    const count = checkNeighbors(
      [],
      [],
      currentLine,
      [...lastLines, ...nextLines],
      (test: string[]) => test.filter(s => s === '@').length < 4,
      lookup,
    )

    lastLines.unshift(currentLine)
    return count + search(lines.slice(1), lastLines.slice(0, lookup), lookup)
  }

  const lines = data.split('\n')

  console.log('Puzzle 4 - Part 1: ', search(lines, [], 1))
  console.log('Puzzle 4 - Part 2: ')
}
puzzle4()
