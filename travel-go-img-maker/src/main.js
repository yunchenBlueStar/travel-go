import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, RadioGroup, Radio, Uploader } from "vant";

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Button)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
  .mount("#app");
