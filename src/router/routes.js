
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },
  { path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/About.vue') }
    ],
    name: "about" },
  { path: '/swag', component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Swag.vue') }
    ],
    name: "swag" },
  { path: '/splash', component: () => import("components/SplashScreen"), name: "splash" },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
