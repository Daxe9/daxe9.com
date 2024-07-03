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
	const isSemiPressed = ref<boolean>(false);

	function inputHandler(e: KeyboardEvent) {
		// handler insert mode
		if (e.key === "i" && !command.value) {
			command.value = "Cannot make changes, 'modifiable' is off";
			return;
		}

		// when the semicolon is pressed,
		// change the mode to COMMAND and clear the remain command
		if (e.key === ":") {
			isSemiPressed.value = true;
			mode.value = Mode.COMMAND;
			command.value = ":";
		} else {
			// check if the pressed key is not a special key, e.g. shift ctrl alt
			if (isSemiPressed.value && e.key.length === 1) {
				command.value += e.key;
			}

			// chech whether user has pressed backspace key
			if (e.key === "Backspace") {
				command.value = command.value.slice(0, -1);
			}
		}

		// check whether enter is pressed or there are no characters remain
		if (e.key === "Enter" || command.value === "") {
			isSemiPressed.value = false;

			mode.value = Mode.NORMAL;

			// remove the first character ":" and remove whitespaces
			const pathName = command.value.slice(1).replace(/\s/g, "");

			// redirect to selected page
			router.push(pathName);
		}
	}
	return {
		command,
		mode,
		isSemiPressed,
		inputHandler
	};
}
