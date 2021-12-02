import { createRouter, createWebHistory } from "vue-router";
import Survey from "../views/Survey.vue";
import Verification from "../views/Verification.vue";

const routes = [
  {
    path: "/",
    name: "Survey",
    component: Survey,
  },
  {
    path: "/verification",
    name: "Verification",
    component: Verification,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
