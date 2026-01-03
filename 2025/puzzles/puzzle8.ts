import { readFile } from '../utils/readFile'

type Vector = {
  x: number
  y: number
  z: number
}

type Distance = {
  vector1: Vector
  vector2: Vector
  distance: number
}

type Circuit = {
  vectors: Set<Vector>
}

function puzzle8() {
  const data = readFile(8, true)
  const vectors = data
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => {
      const v = line.split(',')
      return {
        x: parseInt(v[0], 10),
        y: parseInt(v[1], 10),
        z: parseInt(v[2], 10),
      } as Vector
    })

  const distances: Distance[] = []
  const process = [...vectors]
  let nextVector: Vector = process.splice(0, 1)[0]
  do {
    const nearestVectors: Distance[] = []
    for (const vector of vectors) {
      if (vector === nextVector) {
        continue
      }
      const d = distance(nextVector, vector)
      nearestVectors.push({
        vector1: nextVector,
        vector2: vector,
        distance: Math.abs(d),
      })
    }
    nearestVectors.sort((a, b) => a.distance - b.distance)
    for (const nearestVector of nearestVectors) {
      const found = distances.find(
        (d) =>
          (d.vector1 === nearestVector.vector1 && d.vector2 === nearestVector.vector2) ||
          (d.vector1 === nearestVector.vector2 && d.vector2 === nearestVector.vector1),
      )
      if (found === undefined) {
        distances.push(nearestVector)
        break
      }
    }


    /*const index = process.findIndex((v) => v == nearestVector.vector2)
    process.splice(index, 1)*/
    nextVector = process.splice(0, 1)[0]
  } while (nextVector)

  distances.sort((a, b) => a.distance - b.distance)

  const circuits: Circuit[] = []

  for (const distance of distances) {
    let c = circuits.find((c) => c.vectors.has(distance.vector1) || c.vectors.has(distance.vector2))
    if (!c) {
      c = { vectors: new Set<Vector>() }
      circuits.push(c)
    }
    c.vectors.add(distance.vector1)
    c.vectors.add(distance.vector2)
  }

  console.log('Puzzle 8 - Part 1: ')
  console.log('Puzzle 8 - Part 2: ')
}

function distance(a: Vector, b: Vector): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dz = b.z - a.z

  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

puzzle8()
