export function setLineNumbers(lines: HTMLCollection) {
	for (let i = 0; i < lines.length; i++) {
		const lineNumber = document.createElement("span");
		lineNumber.classList.add("line-number");
		lineNumber.textContent = ""
		for (let j = 0; j <	lines.length.toString().length - (i + 1).toString().length; ++j) {
			lineNumber.textContent += " ";
		}

		lineNumber.textContent += (i + 1).toString();

		lines[i].prepend(lineNumber);
	}
}
