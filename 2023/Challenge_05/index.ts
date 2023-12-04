import fs from "fs/promises"
import path from "path"
import chalk from "chalk"

import description from "./description"

const Challenge05 = async () => {
	const textPath = path.join(
		__dirname,
		"..",
		"..",
		"assets",
		"2023",
		"Challenge_05",
		"database_attacked.txt"
	)

	const wrong: string[] = []
	const correct: string[] = []

	const text = await fs.readFile(textPath, "utf-8").catch(() => "")
	text.split("\n").forEach((line, index) => {
		const [id, username, email, age, location] = line.split(",")

		let validate = false

		if (id && id.match(/^[a-zA-Z0-9]+$/)) validate = true
		else validate = false

		if (validate === true && username && username.match(/^[a-zA-Z0-9]+$/)) validate = true
		else validate = false

		if (validate === true && email && email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,3}$/))
			validate = true
		else validate = false

		if (validate === true && (!age || (age && age.match(/^[0-9]+$/)))) validate = true
		if (validate === true && (!location || (location && location.match(/^[\w]+$/)))) validate = true

		if (validate) correct.push(username)
		else wrong.push(username)
	})

	const response = wrong.map(user => user[0]).join("")
	return `${chalk.bold("RES 5")}: ${response}`
}

export { description }
export default Challenge05
