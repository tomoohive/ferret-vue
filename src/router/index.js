import { createRouter, createWebHistory } from "vue-router";
import Account from "../views/Account.vue";
import EvaluateFashion from "../views/EvaluateFashion.vue";
import LogIn from "../components/LogIn.vue";
import Home from "../views/Home.vue";

import Firebase from "../firebase";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Account",
    component: Account,
    children: [
      {
        path: "/signup",
        component: () => import("../components/SignUp.vue")
      },
      {
        path: "/",
        component: LogIn
      }
    ]
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/initialize",
    name: "InitialAccount",
    component: () => import("../views/InitialAccount.vue")
  },
  {
    path: "/evaluate",
    name: "Evaluate",
    component: EvaluateFashion
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        return { selector: to.hast };
      } else {
        return { x: 0, y: 0 };
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  Firebase.onAuth();
  let currnetUserStatus = store.getters["firebase/isSignedIn"];
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (!requiresAuth) {
    next();
  } else if (requiresAuth && !currnetUserStatus) {
    next("/");
  } else {
    next();
  }
});

export default router;
