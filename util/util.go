package util

import (
	"bufio"
	"log"
	"os"
	"path"
)

func GetScanner(dir string) (*bufio.Scanner, func()) {
	pwd, _ := os.Getwd()
	file, err := os.Open(path.Join(pwd, dir, "puzzle_input.txt"))
	if err != nil {
		log.Fatalf("Can not open input field. error: %v \n", err)
	}
	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)
	return scanner, func() {
		err := file.Close()
		if err != nil {
			log.Println("Can not close file")
		}
	}
}
