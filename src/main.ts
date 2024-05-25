import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { globalLoader, useGlobalLoader } from "vue-global-loader";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(globalLoader, {
  screenReaderMessage: "Loadingggggg......",
  backgroundBlur: 2,
});

app.mount("#app");
