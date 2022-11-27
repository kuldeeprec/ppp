/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import Create from "../views/Create.vue";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Edit from "../views/Edit.vue";
import signup from "../views/signup.vue";
import Info from "../views/Info.vue";
import jwt_decode from "jwt-decode";
const __getCookie = (name) => {
  const cookie = document.cookie.split(name + "=");
  console.log(cookie);
  let cookieValue, cookieExists;
  // if the split length is 2 that means cookie exists
  if (cookie.length === 2 && cookie[1]) {
    cookieValue = cookie[1].split(";")[0];
    cookieExists = true;
  } else cookieExists = false;
  return {
    cookieExists,
    cookieValue: cookieValue || undefined,
  };
};

const checklogin = () => {
  const token_cookie = __getCookie("jwt");
  console.log(token_cookie);

  if (token_cookie.cookieValue) {
    var decoded = jwt_decode(token_cookie.cookieValue);
    console.log(decoded);
    localStorage.setItem("email", decoded.email);
  }

  return (
    token_cookie.cookieExists &&
    token_cookie.cookieValue !== undefined &&
    token_cookie.cookieValue !== null
  );
};
const routes = [
  {
    path: "/",
    name: "notes",
    component: Index,
    meta: {
      chekAuto: true,
    },
  },

  {
    path: "/create",
    name: "create",
    component: Create,
    meta: {
      chekAuto: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
  },

  {
    path: "/edit/:id",
    name: "edit",
    component: Edit,
    meta: {
      chekAuto: true,
    },
  },
  {
    path: "/info",
    name: "info",
    component: Info,
    meta: {
      chekAuto: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.chekAuto) {
    if (checklogin()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
