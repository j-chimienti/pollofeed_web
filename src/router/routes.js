const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Home.vue"), name: "home" },
    ],
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "about", component: () => import("pages/About.vue") },
    ],
  },
  {
    path: "/splash",
    component: () => import("components/SplashScreen"),
    name: "splash",
  },
  { path: "/login", component: () => import("pages/LoginPage"), name: "login" },
  {
    path: "/admin",
    component: () => import("layouts/SimpleLayout"),
    children: [
      {
        component: () => import("pages/Admin"),
        name: "admin",
        path: "",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
]

export default routes
