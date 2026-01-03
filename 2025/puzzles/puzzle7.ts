import { readFile } from '../utils/readFile'

type Beam = {
  startX: number
  startY: number
  ended: boolean
}

function puzzle7() {
  const data = readFile(7, true)
  const lines = data.split('\n').filter((line) => line.length > 0)
  const startLine = lines.splice(0, 1)[0]
  const width = startLine.length
  const height = lines.length - 1

  let counter = 0
  const beams: Beam[] = [{ startX: startLine.search('S'), startY: 0, ended: false }]
  for (let y = 0; y < height; y++) {
    const unfinishedBeams = beams.filter((b) => !b.ended)
    const addedBeams: Beam[] = []
    for (const beam of unfinishedBeams) {
      const char = lines[y][beam.startX]
      if (char !== '^') {
        continue
      }
      counter++
      beam.ended = true
      const check = [...beams, ...addedBeams]
      const newBeamLeft: Beam = { startX: beam.startX - 1, startY: y + 1, ended: false }
      if (newBeamLeft.startX >= 0 && !check.find((b) => !b.ended && b.startX === newBeamLeft.startX)) {
        addedBeams.push(newBeamLeft)
      }
      const newBeamRight: Beam = { startX: beam.startX + 1, startY: y + 1, ended: false }
      if (newBeamRight.startX < width && !check.find((b) => !b.ended && b.startX === newBeamRight.startX)) {
        addedBeams.push(newBeamRight)
      }
    }
    beams.push(...addedBeams)
  }

  console.log('Puzzle 7 - Part 1: ', counter)
  console.log('Puzzle 7 - Part 2: ', beams.length)
}

puzzle7()
