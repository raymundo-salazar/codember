import fs from "fs"
import path from "path"
import { IDescription } from "../../types"

const Challenge01 = async () => {
	const textURL = path.join(__dirname, "..", "..", "assets", "./message_01.txt")
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

	return Object.entries(words).flat().join("")
}

const description: IDescription = { es: "", en: "" }
description.es = `** El reto **
Un espía está enviando mensajes encriptados.

Tu misión es crear un programa que nos ayude a buscar patrones...

Los mensajes son palabras separadas por espacios como este:
gato perro perro coche Gato peRRo sol

Necesitamos que el programa nos devuelva el número de veces que aparece cada palabra en el mensaje, independientemente de si está en mayúsculas o minúsculas.

El resultado será una cadena de texto con la palabra y el número de veces que aparece en el mensaje, con este formato:
gato2perro3coche1sol1

¡Las palabras son ordenadas por su primera aparición en el mensaje!

** Más ejemplos: **
llaveS casa CASA casa llaves -> llaves2casa3
taza ta za taza -> taza2ta1za1
casas casa casasas -> casas1casa1casas1

** Cómo resolverlo **
1. Resuelve el mensaje que encontrarás en este archivo: https://codember.dev/data/message_01.txt

2. Envía tu solución con el comando "submit" en la terminal, por ejemplo así:
submit perro3gato3coche1sol1`

description.en = `
** The Challenge **
A spy is sending encrypted messages.

Your mission is to create a program that decodes the messages.

The messages are words separated by spaces like this:
cat dog dog car Cat doG sun

We need the program to return the number of times each word appears in the message, regardless of whether it is in uppercase or lowercase.

The result will be a text string with the word and the number of times it appears in the message, in this format:
cat2dog3car1sun1

The words are sorted by their first appearance in the message!

** More Examples: **
keys house HOUSE house keys -> keys2house3
cup te a cup -> cup2te1a1
houses house housess -> houses1house1housess1

** How to Solve It **
1. Solve the message you will find in this file: https://codember.dev/data/message_01.txt

2. Submit your solution with the "submit" command in the terminal, for example like this:
submit dog3cat3car1sun1`

export { description }
export default Challenge01
