import { ref, onMounted, Ref } from "vue";
import { setLineNumbers } from "@/services/line-number";

export function useLineNumber(): Ref<HTMLElement | null> {
	const contentContainer: Ref<HTMLElement | null> = ref(null);

	onMounted(() => {
		const lines: HTMLCollection | undefined = contentContainer.value?.children;
		if (!lines) return;

		setLineNumbers(lines);
	});

	return contentContainer;
}
