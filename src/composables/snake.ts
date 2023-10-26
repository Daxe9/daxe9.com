import { useSnakeGameStore } from "src/store/snakeGame";
import { Direction } from "src/services/snakeGame";

export function gameInput(e: KeyboardEvent) {
    const snakeGameStore = useSnakeGameStore();
	// NOTE: do not change this to !snakeGameStore.canPlay
	if (snakeGameStore.canPlay === false) {
		snakeGameStore.canPlay = true;
		return;
	}
	// handle game input
	if (snakeGameStore.hasReadRules) {
		switch (e.key) {
			case "h":
				if (snakeGameStore.input === Direction.RIGHT) return;
				snakeGameStore.setInput(Direction.LEFT);
				break;
			case "j":
				if (snakeGameStore.input === Direction.UP) return;
				snakeGameStore.setInput(Direction.DOWN);
				break;
			case "k":
				if (snakeGameStore.input === Direction.DOWN) return;
				snakeGameStore.setInput(Direction.UP);
				break;
			case "l":
				if (snakeGameStore.input === Direction.LEFT) return;
				snakeGameStore.setInput(Direction.RIGHT);
				break;
			default:
				// if the input is not a valid direction, do nothing
				break;
		}
		return;
	}
}
