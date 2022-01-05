import { noReactElement } from "../types"

interface noReactDomElement extends HTMLElement {
    _virtualDomElement: noReactElement
}

// Helper functions
const isFunction = (obj: any) => typeof obj?.type === "function"

/** Checks if it's a functional component (not a stateful component like a class) */
const isFunctionalComponent = (vNode: any) => {
    const nodeType = vNode?.type
    return isFunction(vNode) && !(nodeType?.prototype?.render)
}

// updates
const updateTextNode = (domElement: noReactDomElement, newVirtualDomElement: noReactElement, oldVirtualDomElement: noReactElement) => {
    if (newVirtualDomElement.props.textContent !== oldVirtualDomElement.props.textContent) {
        domElement.textContent = newVirtualDomElement.props.textContent!
    }
    // Setting the reference to the new vDom element
    domElement._virtualDomElement = newVirtualDomElement
}

const updateDomElement = (domElement: HTMLElement, newVirtualDomElement: any, oldVirtualDomElement?: noReactElement) => {
    const newProps = newVirtualDomElement.props || {}
    const oldProps = oldVirtualDomElement?.props || {}

    // Update the new values
    Object.keys(newProps).forEach(propName => {
        const newValue = newProps[propName]
        const oldValue = oldProps[propName]

        if (newValue !== oldValue) {
            if (propName.slice(0, 2) === "on") {
                // Props is an event listener
                const eventName = propName.toLowerCase().slice(2);
                domElement.addEventListener(eventName, newValue, false)

                if (oldValue) domElement.removeEventListener(eventName, oldValue, false)
            } else if (propName === "value" || propName === "checked") {
                // Special attributes that can't be set with set with setAttribute
                domElement[propName] = newValue
            } else if (propName !== "children") {
                if (propName === "className") {
                    domElement.setAttribute("class", newValue)
                } else {
                    domElement.setAttribute(propName, newValue)
                }
            }
        }
    })

    Object.keys(oldProps).forEach(propName => {
        const newValue = newProps[propName]
        const oldValue = oldProps[propName]

        if (!newValue) {
            if (propName.slice(0, 2) === "on") {
                const eventName = propName.toLowerCase().slice(2);
                domElement.removeEventListener(eventName, oldValue, false)
            } else if (propName !== "children") {
                domElement.removeAttribute(propName)
            }
        }
    })
}

const mountSimpleNode = (virtualElement: any, container: HTMLElement, oldVirtualElement: any, parentComponent = container) => {
    let newDomElement: any = null;
    const nextSibling = oldVirtualElement && oldVirtualElement.nextSibling
    if (virtualElement.type === "text") {
        newDomElement = document.createTextNode(virtualElement.props.textContent)
    } else {
        newDomElement = document.createElement(virtualElement.type)
        updateDomElement(newDomElement, virtualElement)
    }

    newDomElement._virtualDomElement = virtualElement;

    if (nextSibling) {
        container.insertBefore(newDomElement, nextSibling)
    } else {
        container.appendChild(newDomElement)
    }

    virtualElement.children.forEach((child: any) => mountElement(child, newDomElement, oldVirtualElement))
}

const buildFunctionalComponent = (virtualElement: any, context?: any) => {
    return virtualElement.type(virtualElement.props || {})
}

const mountComponent = (virtualElement: any, container: any, oldDom: any) => {
    let nextvDom = null, component = null, newDomElement = null
    if (isFunctionalComponent(virtualElement)) {
        nextvDom = buildFunctionalComponent(virtualElement)
    }

    // Recursively render child components
    if (isFunction(nextvDom)) return mountComponent(nextvDom, container, oldDom)

    newDomElement = mountElement(nextvDom, container, oldDom)
    return newDomElement
}

const mountElement = (virtualElement: any, container: any, oldDom: any): any => {
    return typeof virtualElement.type === "function"
        ? mountComponent(virtualElement, container, oldDom)
        : mountSimpleNode(virtualElement, container, oldDom)
}

const unmountNode = (node: ChildNode, parrentComponent: noReactDomElement) => {
    node.remove()
}

// Diffing algorythm
const diffComponent = (newVirtualDom: any, oldComponent: any, container: any, oldDom: any) => {
    if (!oldComponent) {
        mountElement(newVirtualDom, container, oldDom)
    }

}

const diff = (newVirtualDom: noReactElement, container: HTMLElement, oldDom: noReactDomElement | null) => {
    const oldVirtualDom = oldDom && oldDom._virtualDomElement

    // If the container is empty (first time render)
    if (!oldDom) mountElement(newVirtualDom, container, oldDom)
    // Checking for functional components (JSX)
    else if (typeof newVirtualDom.type === "function") diffComponent(newVirtualDom, null, container, oldDom)
    // If an older representation of the dom has been found
    else if (oldVirtualDom && oldVirtualDom.type === newVirtualDom.type) {
        if (oldVirtualDom.type === "text") {
            updateTextNode(oldDom, newVirtualDom, oldVirtualDom)
        } else {
            updateDomElement(oldDom, newVirtualDom, oldVirtualDom)
        }
        // Set reference to the new vDom element
        oldDom._virtualDomElement = newVirtualDom

        // Recursively diff the children
        // Index by index diffing because we don't have keys yet
        newVirtualDom.children.forEach((child, i) => diff(child, oldDom, oldDom.childNodes[i] as noReactDomElement))

        // Delete old DOM nodes
        let oldNodes = oldDom.childNodes
        if (oldNodes.length > newVirtualDom.children.length) {
            for (let i = oldNodes.length - 1; i >= newVirtualDom.children.length; i -= 1) {
                let nodeToBeRemoved = oldNodes[i]
                unmountNode(nodeToBeRemoved, oldDom)
            }
        }
    }
}


export const render = (virtualElement: noReactElement, container: HTMLElement, oldDom = container.firstChild as noReactDomElement | null) => {
    diff(virtualElement, container, oldDom)
}