import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import FreerunningView from '../views/FreerunningView.vue';
import NotFound from '../views/NotFound.vue';
import Login from '../views/login/Login.vue';
import Register from '../views/login/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/freerunning',
      name: 'Freerunning',
      component: FreerunningView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // Catch all undefined routes and redirect to NotFound
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
      meta: {
        requiresAuth: true
      }
    },
    {
      // Catch all undefined routes and redirect to NotFound
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if token is not present
      next('/login');
    }

    // Continue to the route if token is present
    next();
  } else {
    // Continue for routes that do not require authentication
    next();
  }
});

export default router;