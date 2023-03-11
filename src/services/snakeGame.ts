import { useSnakeGameStore } from "../store/snakeGame";

type Position = Record<"x" | "y", number>;

enum Direction {
	UP = "Up",
	DOWN = "Down",
	LEFT = "Left",
	RIGHT = "Right"
}

const FIELD_COLOR = "#000000";
const FOOD_COLOR = "#f6c177";
const GRID_COLOR = "#FFFFFF";
const SNAKE_COLOR = "#9ccfd8";

function snakeGame(
	canvasContext: CanvasRenderingContext2D,
	cellSize: number,
	canvasWidth: number,
	canvasHeight: number
) {
	// get instance of snakeGameStore
	const snakeGameStore = useSnakeGameStore();

	const context = canvasContext;
	const CELL_SIZE = cellSize;

	let boardWidth: number = canvasWidth - CELL_SIZE;
	let boardHeight: number = canvasHeight - CELL_SIZE;
	const quotientWidth = boardWidth / CELL_SIZE;
	const quotientHeight = boardHeight / CELL_SIZE;
	const integerQuotientWidth = Math.floor(quotientWidth);
	const integerQuotientHeight = Math.floor(quotientHeight);
	boardWidth = integerQuotientWidth * CELL_SIZE;
	boardHeight = integerQuotientHeight * CELL_SIZE;
	/*
	TODO: set actually gameboard width and height
	gameBoardWidth.value = boardWidth;
	gameBoardHeight.value = boardHeight;
	*/

	const width = boardWidth;
	const height = boardHeight;

	let snake: Position[] = [];
	let food: Position | null = null;
	let dir: Direction | null = Direction.RIGHT;
	snakeGameStore.input = Direction.RIGHT;
	let score: number = 0;
	let speedCoeff: number = 1;

	const draw = function (dir: Direction | null) {
		draw_field();
		draw_snake(dir);
		draw_food();
	};

	const draw_field = function () {
		context.fillStyle = FIELD_COLOR;
		context.fillRect(0, 0, width, height);
		const displayGrid = false;
		if (displayGrid) {
			context.strokeStyle = GRID_COLOR;
			for (let i = 0; i <= height; i += CELL_SIZE) {
				context.moveTo(0, i);
				context.lineTo(width, i);
				context.stroke();
			}
			for (let i = 0; i <= width; i += CELL_SIZE) {
				context.moveTo(i, 0);
				context.lineTo(i, height);
				context.stroke();
			}
		}
	};

	const draw_food = function () {
		if (!food) return;
		context.beginPath();
		context.fillStyle = FOOD_COLOR;
		context.arc(food.x + CELL_SIZE / 2, food.y + CELL_SIZE / 2, CELL_SIZE / 2, 0, 2 * Math.PI);
		context.fill();
		context.closePath();
	};

	const draw_snake = function (dir: Direction | null) {
		context.fillStyle = SNAKE_COLOR;
		// context.strokeStyle = "#000000";
		if (!food) return;

		// draw half circle for the head
		let startAngle: number;
		let endAngle: number;
		let toFilledWidth: number;
		let toFilledHeight: number;
		let startWidth: number = snake[0].x;
		let startHeight: number = snake[0].y;

		switch (dir) {
			case Direction.LEFT:
				startAngle = 0.5 * Math.PI;
				endAngle = 1.5 * Math.PI;
				toFilledWidth = CELL_SIZE / 2;
				toFilledHeight = CELL_SIZE;
				startWidth += toFilledWidth;
				break;

			case Direction.UP:
				startAngle = 1 * Math.PI;
				endAngle = 0;
				toFilledWidth = CELL_SIZE;
				toFilledHeight = CELL_SIZE / 2;
				startHeight += toFilledHeight;
				break;

			case Direction.DOWN:
				startAngle = 0;
				endAngle = 1 * Math.PI;
				toFilledWidth = CELL_SIZE;
				toFilledHeight = CELL_SIZE / 2;
				break;
			case Direction.RIGHT:
			default:
				startAngle = 1.5 * Math.PI;
				endAngle = 0.5 * Math.PI;
				toFilledWidth = CELL_SIZE / 2;
				toFilledHeight = CELL_SIZE;
				break;
		}

		context.beginPath();
		context.arc(
			snake[0].x + CELL_SIZE / 2,
			snake[0].y + CELL_SIZE / 2,
			CELL_SIZE / 2,
			startAngle,
			endAngle
		);
		context.fillRect(startWidth, startHeight, toFilledWidth, toFilledHeight);
		context.fill();
		context.closePath();

		for (let i = 1; i < snake.length; i++) {
			context.fillRect(snake[i].x, snake[i].y, CELL_SIZE, CELL_SIZE);
			// context.strokeRect(snake[i].x, snake[i].y, CELL_SIZE, CELL_SIZE);
		}
	};

	const init = function () {
		snake = [];
		for (let i = 0; i < 2; ++i) {
			snake.push({
				x: i * CELL_SIZE,
				y: 0
			});
			snake.reverse();
		}
		dir = Direction.RIGHT;
		snakeGameStore.input = Direction.RIGHT;
		score = 0;
		speedCoeff = 1;

		spawn_food();
	};

	const endGame = () => {
		function wrapText(
			context: CanvasRenderingContext2D,
			text: string,
			x: number,
			y: number,
			maxWidth: number,
			lineHeight: number
		) {
			let words = text.split(" ");
			let line = "";

			for (let n = 0; n < words.length; n++) {
				let testLine = line + words[n] + " ";
				let metrics = context.measureText(testLine);
				let testWidth = metrics.width;
				if (testWidth > maxWidth && n > 0) {
					context.fillText(line, x, y);
					line = words[n] + " ";
					y += lineHeight;
				} else {
					line = testLine;
				}
			}
			context.fillText(line, x, y);
		}
		const title: string = "Game Over!";
		const subtitle: string = "Press any key to restart game"
		let fontSize: number = 50;
		const subTitleFontSize: number = 20;

		context.fillStyle = GRID_COLOR;

		// Set the text properties
		context.font = `${fontSize}px Arial`;
		context.textAlign = "center";
		context.textBaseline = "middle";
		const x = width / 2;
		let y = height / 2;

		context.fillText(title, x, y);
		context.font = `${subTitleFontSize}px Arial`;
		y += fontSize;
		context.fillText(`Score: ${score}`, x, y);
		y += fontSize;
		context.fillText(subtitle, x, y);
	};

	const isContact = function (fieldObj: Position): boolean {
		for (let i = 0; i < snake.length; i++) {
			if (snake[i].x === fieldObj.x && snake[i].y === fieldObj.y) return true;
		}
		return false;
	};

	const isValid = function (pos: Position) {
		return 0 <= pos.x && pos.x < width && 0 <= pos.y && pos.y < height;
	};

	const spawn_food = function () {
		do {
			food = {
				x: Math.floor(Math.round(Math.random() * width) / CELL_SIZE) * CELL_SIZE,
				y: Math.floor(Math.round(Math.random() * height) / CELL_SIZE) * CELL_SIZE
			};
		} while (isContact(food) || !isValid(food));
	};

	const step = function () {
		let newPos: Position = { x: snake[0].x, y: snake[0].y };

		dir = snakeGameStore.input;
		switch (dir) {
			case Direction.UP:
				newPos.y -= CELL_SIZE;
				break;

			case Direction.RIGHT:
				newPos.x += CELL_SIZE;
				break;

			case Direction.DOWN:
				newPos.y += CELL_SIZE;
				break;

			case Direction.LEFT:
				newPos.x -= CELL_SIZE;
				break;
			default:
				// default to right
				newPos.x += CELL_SIZE;
				break;
		}
		if (!isValid(newPos) || isContact(newPos)) {
			endGame();
			return;
		} else if (food && newPos.x === food.x && newPos.y === food.y) {
			score++;
			if (score % 5 === 0) {
				speedCoeff += 0.25;
			}
			spawn_food();
			snake.unshift({
				x: newPos.x,
				y: newPos.y
			});
		} else {
			snake.pop();
			snake.unshift({
				x: newPos.x,
				y: newPos.y
			});
		}
		draw(dir);
		setTimeout(step, 180 / speedCoeff);
	};

	init();
	step();
}

export { Direction, snakeGame };
