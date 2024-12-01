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

	var points int
	var totalScratchcards int
	var wonCards = make([]int, 0)
	for scanner.Scan() {
		line := scanner.Text()
		card := strings.Split(line, ":")
		cardContent := strings.Split(card[1], "|")
		winningNumbers := stringToInt(strings.Split(strings.TrimSpace(cardContent[0]), " "))
		selectedNumbers := stringToInt(strings.Split(strings.TrimSpace(cardContent[1]), " "))

		wins := 0
		for _, number := range selectedNumbers {
			if number == 0 {
				continue
			}
			if len(wonCards) == totalScratchcards+wins {
				wonCards = append(wonCards, 0)
			}
			for _, winningNumber := range winningNumbers {
				if number == winningNumber {
					wonCards[totalScratchcards+wins] = wonCards[totalScratchcards+wins] + 1
					wins++
				}
			}
		}
		points += int(math.Pow(2, float64(wins-1)))
		totalScratchcards++
	}
	var tempSum := 0
	for i := 0; i < len(wonCards); i++ {
		deep()
	}

	log.Printf("Points: %d \n", points)
	log.Printf("Total scratchcards: %d \n", totalScratchcards)
}

func stringToInt(input []string) []int {
	numbers := make([]int, len(input))
	for i, str := range input {
		numbers[i], _ = strconv.Atoi(strings.TrimSpace(str))
	}
	return numbers
}

func deep(wonCards []int) int {
	if () {

	}
	deep(wonCards)
}