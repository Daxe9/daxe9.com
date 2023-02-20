import { createApp } from "vue";
import "./style.scss";
import router from "./router/index";
import App from "./App.vue";
// @ts-ignore
import VueWriter from "vue-writer";
import Spacer from "./components/Spacer.vue";

createApp(App).use(router).use(VueWriter).component("Spacer", Spacer).mount("#app");
