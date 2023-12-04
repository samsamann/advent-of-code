package main

import (
	"bufio"
	"github.com/samsamann/advent-of-code/util"
	"log"
	"math"
	"strconv"
	"strings"
)

func main() {
	var scanner *bufio.Scanner
	var closeFunc func()
	scanner, closeFunc = util.GetScanner("day4")
	defer closeFunc()

	var sum int
	for scanner.Scan() {
		line := scanner.Text()
		card := strings.Split(line, ":")
		cardContent := strings.Split(card[1], "|")
		winningNumbers := stringToInt(strings.Split(strings.TrimSpace(cardContent[0]), " "))
		selectedNumbers := stringToInt(strings.Split(strings.TrimSpace(cardContent[1]), " "))

		points := 0
		for _, number := range selectedNumbers {
			if number == 0 {
				continue
			}
			for _, winningNumber := range winningNumbers {
				if number == winningNumber {
					points++
				}
			}
		}
		sum += int(math.Pow(2, float64(points-1)))
	}
	log.Printf("Points: %d \n", sum)
}

func stringToInt(input []string) []int {
	numbers := make([]int, len(input))
	for i, str := range input {
		numbers[i], _ = strconv.Atoi(strings.TrimSpace(str))
	}
	return numbers
}
