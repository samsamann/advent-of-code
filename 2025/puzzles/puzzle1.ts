import { readFile } from '../utils/readFile'

const startPos = 50

function puzzle1() {
  const data = readFile(1, false)
  const lines = data.split('\n').filter(line => line.length > 0)
  let countZeroes = 0
  let countZeroClicks = 0
  let position = startPos
  let wasAtZero = false
  for (const line of lines) {
    const direction = line[0] === 'L' ? -1 : 1
    const distance = parseInt(line.slice(1), 10)
    const steps = distance % 100
    countZeroClicks += Math.floor((distance - steps) / 100)
    const tempPos = position + direction * steps
    if (tempPos > 99) {
      position = tempPos - 100
      if (position !== 0) {
        countZeroClicks++
      }
    } else if (tempPos < 0) {
      position = 100 + tempPos
      if (!wasAtZero) {
        countZeroClicks++
      }
    } else {
      position = tempPos
    }
    console.log(`Moved ${line}, new position: ${position}`)
    if (position === 0) {
      wasAtZero = true
      countZeroes++
    } else {
      wasAtZero = false
    }
  }
  console.log('Puzzle 1 - Part 1: ', countZeroes)
  console.log('Puzzle 1 - Part 2: ', countZeroClicks + countZeroes)
}

puzzle1()
