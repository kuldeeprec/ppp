import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: "/",
  //   name: "notes",
  //   component: () => import("../views/Index.vue")
  // },
  {
    path: "/",
    name: "create",
    component: () => import("../views/Create.vue")
  },
  // {
  //   path: "/",
  //   name: "Login",
  //   component: () => import("../views/Login.vue")
  // },

  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../views/Edit.vue")
  },
  {
    path: "/info",
    name: "info",
    component: () => import("../views/Info.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
