import { ref } from "vue";
import { useRouter } from "vue-router";

enum Mode {
	NORMAL = "NORMAL",
	COMMAND = "COMMAND",
	VISUALLINE = "VISUAL-LINE"
}

// handle the keyboard input
export function useCommandHandler() {
	// gameInput(e);
	const router = useRouter();
	const command = ref<string>("");
	const mode = ref<Mode>(Mode.NORMAL);
	// check whether the semicolon is pressed for page redirecting
	const isLeaderKeyPressed = ref<boolean>(false);

	function inputHandler(e: KeyboardEvent) {
		// handler insert mode
		if (e.key === "i" && !command.value) {
			command.value = "Cannot make changes, 'modifiable' is off";
			return;
		}

		if (
			command.value.length === 1 &&
			(command.value.charAt(0) === ":" || command.value.charAt(0) === "/")
		) {
			isLeaderKeyPressed.value = true;
			mode.value = Mode.COMMAND;
		}

		// when the semicolon is pressed,
		// change the mode to COMMAND and clear the remain command
		if (e.key === ":" || e.key === "/") {
			isLeaderKeyPressed.value = true;
			mode.value = Mode.COMMAND;
			command.value = e.key;
		} else {
			// check if the pressed key is not a special key, e.g. shift ctrl alt
			if (isLeaderKeyPressed.value && e.key.length === 1) {
				command.value += e.key;
			}

			// check whether user has pressed backspace key
			if (e.key === "Backspace") {
				command.value = command.value.slice(0, -1);
			}
		}

		// check whether enter is pressed or there are no characters remain
		if (e.key === "Enter" || command.value === "") {
			isLeaderKeyPressed.value = false;

			mode.value = Mode.NORMAL;

			if (command.value.charAt(0) === ":") {
				// check whether user wants to go the home page
				if (command.value.length === 1) {
					router.push("/");
				} else {
					// remove the first character ":" and remove whitespaces
					const pathName = command.value.slice(1).replace(/\s/g, "");
					// redirect to selected page
					router.push(pathName);
				}
			} else {
				// if the input string is not empty like "/"
				if (command.value.length > 1) {
					// filter out all already highlighted elements
					const highlightedElements = document.querySelectorAll("span.occurrence");
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

					// Function to highlight text in text nodes
					function highlightNode(node: any) {
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
						} else if (
							node.nodeType === 1 &&
							node.nodeName !== "SCRIPT" &&
							node.nodeName !== "STYLE"
						) {
							// recursively highlight child nodes
							for (let i = 0; i < node.childNodes.length; i++) {
								highlightNode(node.childNodes[i]);
							}
						}
					}

					// Start highlighting from the content element
					highlightNode(contentContainer);
				}
			}
		}
	}
	return {
		command,
		mode,
		isLeaderKeyPressed,
		inputHandler
	};
}
