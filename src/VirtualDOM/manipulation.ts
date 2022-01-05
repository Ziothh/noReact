import type { noReactElement, noReactElementType, createElementProps } from "../types";

export const createElement = (
    type: noReactElementType,
    props: createElementProps = {},
    ...children: (noReactElement | string | boolean)[]
): noReactElement => {
    const childElements: noReactElement[] = children.reduce(
        (acc, child) => {
            if (child != null && child !== false && child !== true) {
                child instanceof Object
                    ? acc.push(child)
                    : acc.push(createElement("text", { textContent: child }))
            }
            return acc
        }, [] as noReactElement[]
    )

    return {
        type,
        children: childElements,
        props: {
            ...props,
            children: childElements
        }
    }
}


