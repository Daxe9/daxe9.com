import { createApp } from "vue";
import "./style.scss";
import router from "./router/index";
import App from "./App.vue";
// @ts-ignore
import VueWriter from "vue-writer";
import Spacer from "./components/Spacer.vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";

const pinia = createPinia();
const head = createHead();

createApp(App).use(head).use(router).use(pinia).use(VueWriter).component("Spacer", Spacer).mount("#app");
