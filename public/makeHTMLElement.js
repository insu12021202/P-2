const $ = document;

/* HTML Element 만드는 함수 */
export function makeElement(element, className, innerText) {
    const returnElement = $.createElement(element);
    returnElement.className = className;
    returnElement.innerHTML = innerText;

    return returnElement;
}