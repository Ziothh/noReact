import {Properties as cProps} from "csstype"
import type { HTMLElementTagName } from "./html";

interface CSSProperties extends cProps<string | number> {}
// Element type
type customElementType = "text"
export type noReactElementType = HTMLElementTagName | customElementType  

// Props
export interface createElementProps {
    className?: string,
    src?: string,
    alt?: string,
    title?: string,
    required?: boolean,
    style?: CSSProperties,
    textContent?: string,
    checked?: boolean,
    id?: string,
} 

export interface noReactElementProps extends createElementProps {
    children?: noReactElement[]
} 


// Element instance
export type noReactElement = {
    type: noReactElementType,
    props: noReactElementProps,
    children: noReactElement[] 
}