/**
 * @description      :
 * @author           : ebdie
 * @group            :
 * @created          : 06/09/2021 - 13:11:23
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 06/09/2021
 * - Author          : ebdie
 * - Modification    :
 **/
import Vue from "vue";
import App from "./App.vue";
import "./index.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
