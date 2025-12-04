import { readFile } from '../utils/readFile'

function puzzle3() {
  const data = readFile(3, false)
  const search = (bank: string, tempResult: number[]): number[] => {
    if (bank.length === 0) {
      return tempResult
    }

    const battery = parseInt(bank.slice(0, 1), 10)
    let newIndex = -1

    const offset = bank.length > tempResult.length ? 0 : tempResult.length - bank.length
    for (let i = tempResult.length - 1; i >= offset; i--) {
      if (battery <= tempResult[i]) {
        break
      }
      newIndex = i
    }

    if (newIndex > -1) {
      tempResult.splice(newIndex, 1, battery)
      tempResult.fill(0, newIndex + 1)
    }
    return search(bank.slice(1), tempResult)
  }

  const banks = data.split('\n')
  let joltageSum = 0
  let sumPartTwo = 0
  for (const bank of banks) {
    if (bank.length === 0) {
      continue
    }
    const found = search(bank, Array.from({length: 2}, (_, __) => 0))
    const sum = found
      .reverse()
      .reduce((sum, x, index) => sum + x * 10 ** index, 0)
    joltageSum += sum

    const foundTwelve = search(bank, Array.from({length: 12}, (_, __) => 0))
    sumPartTwo += foundTwelve
      .reverse()
      .reduce((sum, x, index) => sum + x * 10 ** index, 0)
    console.log(
      `Bank: ${bank}, Found: ${foundTwelve.reverse().join(',')}, Sum: ${sumPartTwo}`,
    )
  }
  console.log('Puzzle 3 - Part 1: ', joltageSum)
  console.log('Puzzle 3 - Part 2: ', sumPartTwo)
}
puzzle3()
