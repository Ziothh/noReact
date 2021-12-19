export * from "./DOM"
// export class ComponentRenderer {
//     constructor(component, parentID) {
//         this.component = component;
//         this.parentID = parentID;
//     }

//     render() {
//         document.getElementById(this.parentID).appendChild(this.component);
//     }
// }

// export const getFormElement = (name) => document.getElementsByName(name)[0];
// export const getElement = (ID) => document.getElementById(ID);

// /**
//  * Creates a HTML element
//  * @param {string} htmlElement
//  * @param {object} attributes
//  */
// export const createElement = (htmlElement, attributes = {}) => {
//     const elementInstance = document.createElement(htmlElement);
//     for (const [key, value] of Object.entries(attributes)) {
//         elementInstance.setAttribute(key, value);
//     }
//     return elementInstance;
// };

// /**
//  * Renders a component in the given parent
//  * @param {() => HTMLElement} component
//  * @param {string} parentID
//  */
// //prettier-ignore
// export const renderComponent = (component, parentID) => {
//     const parent = document.getElementById(parentID);
//     if (parent !== null) document.getElementById(parentID).appendChild(component());
// };

// export const getChildList = (element) => Array.from(element.children);
// export const renderComponent = (component: any, parent: keyof HTMLElementTagNameMap) => {
//     document.querySelector(parent)!.appendChild(component)
// }
// console.log("hi")
export const test = () => {
    console.log("Running test...")
}