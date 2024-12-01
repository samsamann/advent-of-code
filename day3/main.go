package main

import (
	"bufio"
	"github.com/samsamann/advent-of-code/util"
	"log"
	"regexp"
	"strconv"
)

var scanner *bufio.Scanner

func main() {
	var closeFunc func()
	scanner, closeFunc = util.GetScanner("day3")
	defer closeFunc()
	var prevLine, currentLine, nextLine = "", "", ""
	for i := 0; i < 2; i++ {
		scan(&prevLine, &currentLine, &nextLine)
	}

	numberReg, _ := regexp.Compile("\\d+")
	symbolReg, _ := regexp.Compile("[^\\.\\d]")
	asteriskReg, _ := regexp.Compile("\\*")
	neighbourReq, _ := regexp.Compile("\\d+|[^\\d\\.\\d]]")
	checkPartNumberFunc := func(substr string) bool { return symbolReg.MatchString(substr) }
	hasNumberFunc := func(substr string) bool { return numberReg.MatchString(substr) }

	var sum int
	for currentLine != "" {
		for _, index := range numberReg.FindAllIndex([]byte(currentLine), -1) {
			if checkPartNumber(checkPartNumberFunc, prevLine, currentLine, nextLine, index) {
				sum += convert(currentLine, index)
			}
		}
		for _, index := range asteriskReg.FindAllIndex([]byte(currentLine), -1) {
			prevLineOk := check(hasNumberFunc, prevLine, index)
			if prevLineOk {
				substr(prevLine, index)
			}
			currentLineOk := check(hasNumberFunc, currentLine, index)
			nextLineOk := check(hasNumberFunc, nextLine, index)
		}
		scan(&prevLine, &currentLine, &nextLine)
	}
	log.Printf("The sum of all the part numbers is: %d \n", sum)
}

func scan(prevLine, currentLine, nextLine *string) {
	*prevLine = *currentLine
	*currentLine = *nextLine
	if scanner.Scan() {
		*nextLine = scanner.Text()
	} else {
		*nextLine = ""
	}
}

func checkPartNumber(checkFunc func(substr string) bool, prevLine, currentLine, nextLine string, index []int) bool {
	return check(checkFunc, prevLine, index) || check(checkFunc, currentLine, index) || check(checkFunc, nextLine, index)
}

func substr(line string, index []int) string {
	var start, end = index[0] - 1, index[1] + 1
	if start < 0 || len(line) == 0 {
		start = 0
	}
	if len(line) <= end {
		end = len(line)
		if end > 0 {
			end -= 1
		}
	}
	return line[start:end]
}

func check(checkFunc func(substr string) bool, line string, index []int) bool {
	return checkFunc(substr(line, index))
}

func convert(line string, index []int) int {
	num, err := strconv.Atoi(line[index[0]:index[1]])
	if err != nil {
		log.Printf("can not convert string to int. error: %v", err)
		return 0
	}
	return num
}
