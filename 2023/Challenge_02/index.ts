import fs from "fs"
import path from "path"
import description from "./description"

type THashItems = "#" | "@" | "*" | "&"

const reference = {
	"#": (a: number): number => a + 1,
	"@": (a: number): number => a - 1,
	"*": (a: number): number => a * a,
	"&": (a: number): number => a,
}

const Challenge02 = async () => {
	let value = 0
	const textPath = path.join(
		__dirname,
		"..",
		"..",
		"assets",
		"2023",
		"Challenge_02",
		"message_02.txt"
	)
	const text = fs.readFileSync(textPath, { encoding: "utf-8" })
	const response = text
		.split("")
		.map((hash: string) => {
			value = reference[hash as THashItems](value)
			if (hash == "&") return value
		})
		.filter(ele => ele !== undefined)
		.join("")
	return response
}

export { description }
export default Challenge02
