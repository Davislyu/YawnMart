import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { globalLoader, useGlobalLoader } from "vue-global-loader";
import { createNotivue } from "notivue";
import App from "./App.vue";
import router from "./router";
import "notivue/notification.css"; // Only needed if using built-in <Notification />
import "notivue/animations.css"; // Only needed if using default animations
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(globalLoader, {
  screenReaderMessage: "Loadingggggg......",
  backgroundBlur: 2,
});
const notivue = createNotivue();
app.use(notivue);
app.mount("#app");
