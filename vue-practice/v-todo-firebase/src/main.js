import './firebase'

import Vue from 'vue'
import App from './App.vue'
import router from "./routes/index";
import { firestorePlugin } from 'vuefire'
import store from "./store";
import * as firebase from 'firebase/app'
import "firebase/auth";

let app = '';

Vue.config.productionTip = false;

Vue.use(firestorePlugin)



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      store.dispatch("fetchUser", user);
    });
  },

})
