package main

import (
	"fmt"
	"github.com/samsamann/advent-of-code/util"
	"log"
	"regexp"
	"strconv"
	"strings"
)

var digitMap = map[string]int{
	"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
}

func main() {
	scanner, closeFile := util.GetScanner("day1")
	defer closeFile()
	var sum int

	keys := make([]string, len(digitMap))
	i := 0
	for k := range digitMap {
		keys[i] = k
		i++
	}
	r, _ := regexp.Compile(fmt.Sprintf("\\d|%s", strings.Join(keys, "|")))
	for scanner.Scan() {
		textLine := scanner.Text()
		findings := r.FindAllString(textLine, -1)
		var str string
		switch len(findings) {
		case 0:
			continue
		case 1:
			str = getDigitStr(findings[0]) + getDigitStr(findings[0])
			break
		default:
			str = getDigitStr(findings[0]) + getDigitStr(findings[len(findings)-1])
			break
		}
		i, err := strconv.Atoi(str)
		if err == nil {
			sum += i
		}
	}
	log.Printf("The sum of all the calibration values is: %d \n", sum)
}

func getDigitStr(str string) string {
	if len(str) > 1 {
		digit := strconv.Itoa(digitMap[str])
		return digit
	}
	return str
}
