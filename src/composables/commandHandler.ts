import { ref } from "vue";
import { useRouter } from "vue-router";

enum Mode {
	NORMAL = "NORMAL",
	COMMAND = "COMMAND",
	VISUALLINE = "VISUAL-LINE"
}

// handle the keyboard input
export function useCommandHandler() {
	// the following line is for snake game
	// gameInput(e);
	const router = useRouter();
	const command = ref<string>("");
	const mode = ref<Mode>(Mode.NORMAL);
	// check whether the semicolon is pressed for page redirecting
	const isLeaderKeyPressed = ref<boolean>(false);

	function goToNormalMode(message?: string) {
		mode.value = Mode.NORMAL;
		isLeaderKeyPressed.value = false;
		command.value = message ? message : "";
	}

	// Function to highlight text in text nodes
	function highlightNode(regex: RegExp, node: any) {
		// text node
		if (node.nodeType === 3) {
			const text = node.nodeValue;
			const newText = text.replace(regex, (match: string) => {
				return `<span class="occurrence">${match}</span>`;
			});

			// check if the text contains the selected word
			if (newText !== text) {
				const span = document.createElement("span");
				span.innerHTML = newText;
				node.parentNode.replaceChild(span, node);
			}
			// check if the node is an element node(div, p, span etc..) and it is not script and style tag
		} else if (node.nodeType === 1 && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
			// recursively highlight child nodes
			for (let i = 0; i < node.childNodes.length; i++) {
				highlightNode(regex, node.childNodes[i]);
			}
		}
	}

	function keyStrokesHandler(e: KeyboardEvent) {
		switch (mode.value) {
			case Mode.NORMAL: {
				console.log("Normal Mode");
				switch (e.key) {
					case "i": {
						goToNormalMode("Cannot make changes, 'modifiable' is off");
						break;
					}
					case ":": {
						// in command mode
						isLeaderKeyPressed.value = true;
						mode.value = Mode.COMMAND;
						command.value = e.key;
						break;
					}
					case "/": {
						// in command mode
						isLeaderKeyPressed.value = true;
						mode.value = Mode.COMMAND;
						command.value = e.key;
						break;
					}
				}
				break;
			}
			case Mode.COMMAND: {
				console.log("Command Mode");
				switch (e.key) {
					case "Backspace":
						command.value = command.value.slice(0, -1);
						break;
					case ":":
						command.value = ":";
						break;
					case "Enter":
						// check whether the leader key's pressed
						if (command.value.charAt(0) === ":") {
							const pathName = command.value.slice(1).replace(/\s/g, "") || "/";
							command.value = "";
							router.push(pathName);
						} else if (command.value.charAt(0) === "/") {
							// if the input string is not empty like "/"
							if (command.value.length > 1) {
								// filter out all already highlighted elements
								const highlightedElements =
									document.querySelectorAll("span.occurrence");
								highlightedElements.forEach((element) => {
									element.classList.remove("occurrence");
								});

								const textToHighlight = command.value.slice(1).replace(/\s/g, "");
								// escape all special characters
								const escapedTextToHighlight = textToHighlight.replace(
									/[-\/\\^$*+?.()|[\]{}]/g,
									"\\$&"
								);

								// select container div in order to search within it
								const contentContainer = document.querySelector(
									".content-container"
								) as Element;

								const regex = new RegExp(`${escapedTextToHighlight}`, "g");

								// Start highlighting from the content element
								highlightNode(regex, contentContainer);
							}
						}
						break;
					default:
						if (isLeaderKeyPressed.value && e.key.length === 1) {
							command.value += e.key;
						}
						break;
				}
				break;
			}
			default:
				break;
		}
	}

	function inputHandler(e: KeyboardEvent) {
		console.log(e);
		// if user tries to go back to normal mode
		if (e.key === "Escape" || (e.key === "c" && e.ctrlKey)) {
			goToNormalMode();
		}
		// if (e.key === "i" && !command.value) {
		// 	goToNormalMode("Cannot make changes, 'modifiable' is off");
		// }

		keyStrokesHandler(e);
		if (command.value === "") {
			isLeaderKeyPressed.value = false;
			mode.value = Mode.NORMAL;
		}
	}
	return {
		command,
		mode,
		isLeaderKeyPressed,
		inputHandler
	};
}
