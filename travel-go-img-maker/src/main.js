import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import liff from "@line/liff";
import { Button, RadioGroup, Radio, Uploader, Dialog } from "vant";
liff
  .init({
    liffId: "1656403121-1Q8J97pn", // Use own liffId
  })
  .then(() => {
    // Start to use liff's api
  })
  .catch((err) => {
    // Error happens during initialization
    console.log(err.code, err.message);
  });

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Button)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
  .use(Dialog)
  .mount("#app");
