import * as firebase from 'firebase/app'
import "firebase/auth";
// import { Auth } from '@/firebase/auth';
import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
// import firebase from 'firebase/app';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta.requiresAuth)) {
//     if (firebase.auth().currentUser) {
//       next();
//     } else {
//       next({ path: '/login' });
//     }
//   }
//   next();
// });

export default router
