import { defineStore } from "pinia";

type Status = {
	pageName: string;
};

export const useStatusStore = defineStore("status", {
	state: (): Status => ({
		pageName: "xie"
	}),
	actions: {
		changePageName(name: string) {
			this.pageName = name;
		}
	}
});
