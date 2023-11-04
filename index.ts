#!/usr/bin/env node
import yargs from "yargs"
import chalk from "chalk"
import { hideBin } from "yargs/helpers"
import { IArgvs } from "./types"
import { logo } from "./assets/logo"

const availableYears = [2023]
const currentDate = new Date()
const defaultYear = availableYears.includes(currentDate.getFullYear())
	? currentDate.getFullYear()
	: availableYears.at(-1)

process.stdout.write(chalk.green(logo.replace("{{year}}", `${defaultYear}`)))

const options: any = yargs(hideBin(process.argv))
	.command("challenge <year> <number>", "Select the exercise to get result by year", yargs => {
		yargs
			.positional("year", {
				alias: "y",
				describe: "Year of codember",
				type: "number",
				default: defaultYear,
				choices: availableYears,
			})
			.positional("number", {
				alias: "n",
				describe: "Challenge number",
				type: "number",
				required: true,
				default: 1,
			})
			.option("description", {
				alias: "d",
				desc: "Show the description of the selected challenge",
			})
			.demandOption(["year", "number"])
	})
	.command("*", "", () => {
		yargs.help()
	})
	.demandCommand(1, "You need at least one command before moving on")
	.parse()

if (options._[0] != "challenge") process.exit()

const { year, number }: IArgvs = options as any
const challengeNumber = String(number).padStart(2, "0")
const response = require(`./${year}/Challenge_${challengeNumber}`).default

response().then(res => {
	process.stdout.write(chalk.bold(`Challenge ${challengeNumber}:\n`))
	process.stdout.write(res)
})
