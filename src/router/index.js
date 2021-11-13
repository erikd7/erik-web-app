/**
 * @description      :
 * @author           : ebdie
 * @group            :
 * @created          : 31/10/2021 - 11:55:13
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 31/10/2021
 * - Author          : ebdie
 * - Modification    :
 **/
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Chess from "../components/Chess.vue";
import Resume from "../components/Resume.vue";
import Cribbage from "../components/Cribbage.vue";

Vue.use(VueRouter);

export const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Resume",
    path: "/resume",
    component: Resume,
  },
  {
    name: "Chess",
    path: "/chess",
    component: Chess,
  },
  {
    name: "Cribbage",
    path: "/cribbage",
    component: Cribbage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
