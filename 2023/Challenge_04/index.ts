import fs from "fs"
import path from "path"
import description from "./description"
import chalk from "chalk"

const Challenge04 = async () => {
	const position = 33
	const folderPostion = 13
	const textPath = path.join(
		__dirname,
		"..",
		"..",
		"assets",
		"2023",
		"Challenge_04",
		"files_quarantine.txt"
	)

	const text = fs.readFileSync(textPath, { encoding: "utf-8" })
	const correct: any[] = []
	const incorrect: any[] = []
	text.split("\n").forEach(file => {
		const [name, checksum] = file.split("-")
		const letters: [string, number][] = []

		name.split("").forEach(letter => {
			const index = letters.findIndex(([l]) => l === letter)
			if (index == -1) letters.push([letter, 1])
			else letters[index][1]++
		})

		const filtered = letters
			.filter(([, quantity]) => quantity === 1)
			.map(([letter]) => letter)
			.join("")

		if (filtered == checksum) correct.push(checksum)
		else incorrect.push(name)
	})

	console.log(correct.length)
	return `${chalk.bold("RETO_4")}: ${correct[position - 1]}`
}

export { description }
export default Challenge04
