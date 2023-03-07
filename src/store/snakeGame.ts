import { defineStore } from 'pinia'
import { Direction } from '../services/snakeGame'

type SnakeGameState = {
	input: Direction | null
	hasReadRules: boolean
}

export const useSnakeGameStore = defineStore("snakeGame", {
	state: (): SnakeGameState => ({
		input: null,
		hasReadRules: false
	}),
	actions: {
		setInput(direction: Direction): void {
			// if it's not started, don't do anything
			if (!this.hasReadRules) return;
			this.input = direction
		},
		
		readRules(): void {
			this.hasReadRules = true
		}
	}

})
