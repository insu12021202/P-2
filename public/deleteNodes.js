export function deleteNodes(parentClass) {
	const parentNode = document.querySelector(parentClass);
	while (parentNode.hasChildNodes()) {
		parentNode.removeChild(parentNode.firstChild);
	}
}