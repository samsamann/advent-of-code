import { readFile } from '../utils/readFile'

function puzzle2() {
  const data = readFile(2, false)
  const ranges = data.split(',')
  let invalidIdSum: number = 0
  let invalidIdSumPart2: number = 0
  for (const range of ranges) {
    const [startStr, endStr] = range.split('-')
    invalidIdSum += part1(startStr, endStr)
    invalidIdSumPart2 += part2(startStr, endStr)
  }
  console.log('Puzzle 2 - Part 1: ', invalidIdSum)
  console.log('Puzzle 2 - Part 2: ', invalidIdSumPart2)
}


function part1(startStr: string, endStr: string): number {
  const start = parseInt(startStr, 10)
  const end = parseInt(endStr, 10)
  let sum = 0;
  for (let i = start; i <= end; i++) {
    const idStr = i.toString(10)
    if (idStr.length % 2 !== 0) {
      continue
    }
    const firstHalf = idStr.slice(0, idStr.length / 2)
    const secondHalf = idStr.slice(idStr.length / 2)

    if (firstHalf === secondHalf) {
      sum += i
    }
  }
  return sum
}

function part2(startStr: string, endStr: string): number {
  const start = parseInt(startStr, 10)
  const end = parseInt(endStr, 10)
  let sum = 0;
  for (let i = start; i <= end; i++) {
    const id = i.toString(10)
    for (let j = 1; j < id.length; j++) {
      const matches = id.match(new RegExp(`^(${id.slice(0, j)})+$`))
      if (matches) {
        sum += i
        break
      }
    }
  }
  return sum
}

puzzle2()
