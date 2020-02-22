import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import 'firebase/storage';

Vue.use(Vuex)

export const store = new Vuex.Store({
    // ...
    state: {
        loadedMeetups: [
            {
                id: '1',
                src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                title: '会议',
                description: 'asfsafasfas',
                date: '2020-02-22',
                location: '广州'
            },
            {
                id: '2',
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                title: '会议',
                description: 'asfsafasfas',
                date: '2020-02-21',
                location: '深圳'
            }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadedMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
              .then((data) => {
                  const meetups = []
                  const obj = data.val()
                  for (let key in obj) {
                      meetups.push({
                          id: key,
                          title: obj[key].title,
                          description: obj[key].description,
                          src: obj[key].src,
                          date: obj[key].date,
                          creatorId: obj[key].creatorId
                      })
                  }
                  
                  commit('setLoadedMeetups', meetups)
                  commit('setLoading', false)
              })
              .catch(
                  (error) => {
                      console.log(error)
                  }
              )
        },
        createMeetup ({commit, getters}, payload) {
            const meetup = {
              title: payload.title,
              location: payload.location,
              description: payload.description,
              date: payload.date.toISOString(),
              creatorId: getters.user.id
            }
            let src
            let key
            firebase.database().ref('meetups').push(meetup)
              .then((data) => {
                key = data.key
                return key
              })
              .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
              })
              .then(snapshot => {
                return new Promise((resolve, reject) => {
                  snapshot.ref.getDownloadURL().then(url => {
                    snapshot.downloadURL = url
                    resolve(snapshot)
                  });
                  reject(new Error("Whoops!"));
                })
              })
              .then((snapshot) => {
                src = snapshot.downloadURL
                return firebase.database().ref('meetups').child(key).update({src: src})
              })
              .then(() => {
                commit('createMeetup', {
                  ...meetup,
                  src: src,
                  id: key
                })
              })
              .catch((error) => {
                console.log(error)
              })
          },
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
              .then(
                  user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registerMeetups: []
                    }
                    commit('setUser', newUser)
                  }
              )
              .catch(
                  error => {
                      commit('setLoading', false)
                      commit('setError', error)
                      console.log(error)
                  }
              )
        },
        signUserIn ({commit} ,payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
              .then(
                  user => {
                    const newUser = {
                        id: user.id,
                        registerMeetups: []
                    }
                    commit('setUser', newUser)
                  }
                  
              )
              .catch(
                  error => {
                    commit('setLoading', false)
                    commit('setError', error)
                      console.log(error)
                  }
              )
        },
        autoSignin({commit}, payload) {
            commit('setUser', {id: payload.uid, registerMeetups:[]})
        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters:{
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },

        featureMeetups (state, getters) {

            return getters.loadedMeetups.slice(0,9)

        },

        loadedMeetup (state) {
            return (meetupId) => {
              return state.loadedMeetups.find((meetup) => {
                return meetup.id === meetupId
              })
            }
        },

        user (state) {
            return state.user
        },

        loading (state) {
            return state.loading
        },

        error (state) {
            return state.error
        }
    }
})