import { createRouter, createWebHistory } from "vue-router";
import Account from "../views/Account.vue";
import EvaluateFashion from "../views/EvaluateFashion.vue";
import LogIn from "../components/LogIn.vue";
import InitialAccount from "../views/InitialAccount.vue";
import Home from "../views/Home.vue";
import { auth } from "../firebase"

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
    component: InitialAccount
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
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next("/home");
  } else if (!requiresAuth && auth.currentUser) {
    next('/');
  } else {
    next();
  }
})

export default router;
