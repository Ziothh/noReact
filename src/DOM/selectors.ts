import { HTMLElementTagName } from "../types"

/** Equivalent to `document.querySelector` */
export const $ = (query: HTMLElementTagName) => document.querySelector(query)
/** Equivalent to `document.querySelectorAll` */
export const $$ = (query: HTMLElementTagName) => document.querySelectorAll(query)