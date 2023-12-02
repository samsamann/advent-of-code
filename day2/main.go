package main

import (
	"github.com/samsamann/advent-of-code/util"
	"log"
	"regexp"
	"strconv"
	"strings"
)

var maxCubes = map[string]int{
	"red": 12, "green": 13, "blue": 14,
}

func main() {
	scanner, closeFile := util.GetScanner("day2")
	defer closeFile()
	var sumPuzzleOne int
	var sumPuzzleTwo int

	r, _ := regexp.Compile("\\d+")
	for scanner.Scan() {
		line := scanner.Text()
		gameData := strings.Split(line, ":")
		gameId, err := strconv.Atoi(r.FindString(gameData[0]))
		if err != nil {
			continue
		}
		var isPossible = true
		var power int
		fewCube := make(map[string]int, 3)
		sets := strings.Split(gameData[1], ";")
		for _, set := range sets {
			power = 1
			cubes := strings.Split(strings.TrimSpace(set), ",")
			for _, cube := range cubes {
				cubeData := strings.Split(strings.TrimSpace(cube), " ")
				color := strings.TrimSpace(cubeData[1])
				count, err := strconv.Atoi(r.FindString(cubeData[0]))
				if err != nil {
					log.Println(err)
					continue
				}
				t := fewCube[color]
				if t == 0 || t < count {
					fewCube[color] = count
				}
				if maxCubes[color] < count {
					isPossible = false
				}
			}
		}
		if isPossible {
			sumPuzzleOne += gameId
		}
		for _, c := range fewCube {
			power *= c
		}
		sumPuzzleTwo += power
	}

	log.Printf("Puzzle 1: The sum of all the calibration values is: %d \n", sumPuzzleOne)
	log.Printf("Puzzle 2: The sum of all the calibration values is: %d \n", sumPuzzleTwo)
}
