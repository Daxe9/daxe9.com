import { ref } from "vue";

export function useScreenSize() {
	const width = ref<number>(window.innerWidth);
	const height = ref<number>(window.innerHeight);

	function handleResize() {
		width.value = window.innerWidth;
		height.value = window.innerHeight;
	}

	window.addEventListener("resize", handleResize);

	return {
		width,
		height,
	};
}
