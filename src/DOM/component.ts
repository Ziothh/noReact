interface ComponentAttributes  {
    id?: string
    class?: string
    style?: CSSStyleDeclaration
    children?: HTMLElement[]
    [otherOptions: string | number]: any
}

export const createComponent = <TagName extends keyof HTMLElementTagNameMap>(
    tagName: TagName, 
    attributes?: ComponentAttributes, 
): HTMLElementTagNameMap[TagName]=> {
    const component = document.createElement(tagName)
    
    if (attributes) Object.entries(attributes).forEach(([key, value]) => {
        if (key !== "children") component[key] = value
        else if (value) value.forEach((el: HTMLElement) => component.appendChild(el))
    })



    return component
}