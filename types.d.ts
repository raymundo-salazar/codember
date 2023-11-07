import { string } from "yargs"

export interface IArgvs {
	number: number
	year: number
	description: boolean
	language: "es" | "en"
}

export interface IDescription {
	es: string
	en: string
}
