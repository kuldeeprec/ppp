import { createRouter, createWebHistory } from "vue-router";
import Create from "../views/Create.vue";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Edit from "../views/Edit.vue";
import Info from "../views/Info.vue";

const routes = [
  {
    path: "/",
    name: "notes",
    component: Index
  },

  {
    path: "/create",
    name: "create",
    component: Create
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },

  {
    path: "/edit/:id",
    name: "edit",
    component: Edit
  },
  {
    path: "/info",
    name: "info",
    component: Info
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
