import fs from "fs"
import path from "path"
import chalk from "chalk"

import description from "./description"

const Challenge01 = async () => {
	const textURL = path.join(
		__dirname,
		"..",
		"..",
		"assets",
		"2023",
		"Challenge_01",
		"message_01.txt"
	)
	const text = fs.readFileSync(textURL, { encoding: "utf-8" })
	const words: { [name: string]: number } = {}
	text
		.toLowerCase()
		.split(" ")
		.forEach((word: string) => {
			word = word.replace(/\W/, "")
			if (!words[word]) words[word] = 0
			words[word]++
		})

	const response = Object.entries(words).flat().join("")
	return `${chalk.bold("RES 1")}: ${response}`
}

export { description }
export default Challenge01
