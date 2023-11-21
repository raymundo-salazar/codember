import fs from "fs"
import path from "path"
import description from "./description"
import chalk from "chalk"

const Challenge03 = async () => {
	const position = 42
	const folderPostion = 13
	const textPath = path.join(
		__dirname,
		"..",
		"..",
		"assets",
		"2023",
		"Challenge_03",
		"encryption_policies.txt"
	)

	const text = fs.readFileSync(textPath, { encoding: "utf-8" })
	const result = text.split("\n").filter(line => {
		const [policy, password] = line.split(": ")
		const [range, letter] = policy.split(" ")
		const [min, max] = range.split("-").map(Number)
		const letterCount = password.split(letter).length - 1
		return !(letterCount >= min && letterCount <= max)
	})

	return `${chalk.bold("RETO_3")}: ${result[position - 1].split(": ")[1]}
${chalk.bold("PRIVATE_FOLER")}: ${result[folderPostion - 1].split(": ")[1]}
`
}

export { description }
export default Challenge03
