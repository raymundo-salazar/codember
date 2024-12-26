#!/usr/bin/env node

import yargs, { Argv } from "yargs"
import chalk from "chalk"
import { hideBin } from "yargs/helpers"
import { IArgvs } from "./types"
import { logo } from "./assets/logo"
import { exec } from "child_process"

const availableYears = [2023, 2024]
const currentDate = new Date()
const defaultYear = availableYears.includes(currentDate.getFullYear())
	? currentDate.getFullYear()
	: availableYears.at(-1)

process.stdout.write(chalk.green(logo.replace("{{year}}", `${defaultYear}`)))

const options: any = yargs(hideBin(process.argv))
	.command("about_me", "More about me")
	.command("challenge <number>", "Select the exercise to get result by year", (yargs: Argv<{}>) => {
		yargs
			.positional("number", {
				alias: "n",
				describe: "Challenge number",
				type: "number",
				required: true,
				default: 1,
			})
			.option("year", {
				alias: "y",
				describe: "Year of codember",
				type: "number",
				default: defaultYear,
				choices: availableYears,
			})
			.option("description", {
				alias: "d",
				type: "boolean",
				desc: "Show the description of the selected challenge",
			})
			.demandOption(["year", "number"])
	})
	.option("language", {
		alias: "l",
		choices: ["en", "es"],
		default: "en",
	})
	.command("*", "", () => {
		yargs.help()
	})
	.demandCommand(1, "You need at least one command before moving on")
	.parse()

const { year, number, description, language }: IArgvs = options as any
const challengeNumber = String(number).padStart(2, "0")

if (options._[0] == "about_me") {
	const aboutMe = require("./aboutMe")
	process.stdout.write(aboutMe[language] + "\n")
}
if (options._[0] != "challenge") process.exit()

try {
	if (year == 2024) {
		// All challenges for this year are developed in python, so we need to run the python script and get the result to show it as a custom format
		exec(`python3 ./${year}/Challenge_${challengeNumber}/index.py`, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`)
				return
			}
			process.stdout.write(chalk.bold(`Challenge ${challengeNumber}:\n`))
			process.stdout.write(`${chalk.bold("RES")}: ${stdout}`)

			if (stderr) {
				console.error(`stderr: ${stderr}`)
			}

			if (error) {
				console.error(`error: ${error}`)
			}

			if (error || stderr) {
				console.error(
					chalk.red(
						chalk.bold("Error: "),
						`Challenge number "${number}" not found. Please try again with another challenge number or year.\n`
					)
				)
			}

			if (error || stderr) {
				process.exit(1)
			}
		})
	} else {
		const challenge = require(`./${year}/Challenge_${challengeNumber}`)
		if (description) process.stdout.write(challenge.description[language] + "\n")
		else
			challenge.default().then((res: string) => {
				process.stdout.write(chalk.bold(`Challenge ${challengeNumber}:\n`))
				process.stdout.write(res + "\n")
			})
	}
} catch (error: any) {
	if (error.code === "MODULE_NOT_FOUND")
		console.error(
			chalk.red(
				chalk.bold("Error: "),
				`Challenge number "${number}" not found. Please try again with another challenge number or year.\n`
			)
		)
}
