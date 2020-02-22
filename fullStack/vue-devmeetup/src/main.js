import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase/app'
import vuetify from './plugins/vuetify';
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/info/Alert.vue'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAy0MAbG1a071OPwf6QDV2xCSElL0OuyeY',
      authDomain: 'devmeetup-9a892.firebaseapp.com',
      databaseURL: 'https://devmeetup-9a892.firebaseio.com',
      projectId: 'devmeetup-9a892',
      storageBucket: "gs://devmeetup-9a892.appspot.com",
    })

    firebase.auth().onAuthStateChanged((user => {
      if(user) {
        this.$store.dispatch('autoSignin', user)
      }
    }))

    this.$store.dispatch('loadedMeetups')
  },
}).$mount('#app')
