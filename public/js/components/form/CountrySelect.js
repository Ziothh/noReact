import { renderComponent, createElement, getFormElement } from "..";

const CountrySelect = () => {
    const placeholder = "Select your country";

    const selector = getFormElement("country");
    const countryOptions = Array.from(selector.children);
    let selectedOption = selector.value ?? placeholder;
    console.log(countryOptions.forEach((c) => console.log(c.value)));

    const wrapper = createElement("div", { id: "country-selector" });

    const selectedDiv = createElement("div", { class: "selected-option" });
    const otherOptions = createElement("div", { class: "other-options" });
    const selectedText = createElement("p");

    countryOptions.forEach((co) => (co.onclick = () => console.log(co)));

    // console.log(countryOptions.map((co) => co.innerText));
    // selectedText.innerText = countryOptions.find(
    //     (co) => co.value === selector.value
    // ).innerText;

    selectedDiv.appendChild(selectedText);

    wrapper.appendChild(selectedDiv);
    wrapper.appendChild(otherOptions);
    return wrapper;
};

const renderCountrySelect = () => renderComponent(CountrySelect, "country");
export default renderCountrySelect;
