import { defineStore } from "pinia";

type ErrorState = {
    message: string;
};

export const useErrorStore = defineStore("error", {
    state: (): ErrorState => ({
        message: ""
    }),
});
