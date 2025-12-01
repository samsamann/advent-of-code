import * as fs from 'node:fs'
import * as path from 'node:path'

const __dirname = import.meta.dirname;

export function readFile(puzzle: number, test: boolean = false): string {
  const name = test ? `test_input${puzzle}` : `puzzle_input${puzzle}`
  return fs.readFileSync(
    path.resolve(__dirname, '../data', `${name}.txt`),
    'utf-8',
  )
}
