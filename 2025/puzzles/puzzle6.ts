import { readFile } from '../utils/readFile'

function puzzle6() {
  const data = readFile(6, false)

  const lines = data.split('\n').filter((line) => line.length > 0)
  const mathProblems: (number | string)[][] = []
  for (let i = 0; i < lines.length; i++) {
    const inputs = lines[i].trim().split(/\s+/)
    for (let j = 0; j < inputs.length; j++) {
      if (!mathProblems[j]) {
        mathProblems[j] = []
      }
      let input: string | number = inputs[j]
      if (!isNaN(parseInt(input, 10))) {
        input = parseInt(input, 10)
      }
      mathProblems[j].push(input)
    }
  }

  let grandTotal = 0
  for (let i = 0; i < mathProblems.length; i++) {
    const problem = mathProblems[i]
    const operator = problem.splice(-1, 1)[0]
    if (operator === '+') {
      grandTotal += (problem as number[]).reduce((a, b) => a + b, 0)
    } else if (operator === '*') {
      grandTotal += (problem as number[]).reduce((a, b) => a * b, 1)
    } else {
      console.log('Unknown operator: ', operator)
    }
  }

  console.log('Puzzle 6 - Part 1: ', grandTotal)
  console.log('Puzzle 6 - Part 2: ', 0)
}
puzzle6()
