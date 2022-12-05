import { createApp } from "vue";
import "./style.scss";
import router from "./router/index";
import App from "./App.vue";
// @ts-ignore
import VueWriter from "vue-writer";

createApp(App).use(router).use(VueWriter).mount("#app");
