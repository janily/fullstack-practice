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
        registerUserForMeetup (state, payload) {
            const id = payload.id
            if (state.user.registerMeetups.findIndex(meetup => meetup.id === id) >= 0) {
                return 
            }
            state.user.registerMeetups.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserForMeetup (state, payload) {
            const registerMeetups = state.user.registerMeetups
            registerMeetups.splice(registerMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id == payload.id
            })

            if(payload.title) {
                meetup.title = payload.title
            }

            if(payload.description) {
                meetup.description = payload.description
            }

            if(payload.date) {
                meetup.date = payload.date
            }
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
        registerUserForMeetup({commit, getters}, payload){
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/')
              .push(payload)
              .then(data => {
                  commit('setLoading', false)
                  commit('registerUserForMeetup', {id: payload, fbKey: data.key})
              })
              .catch(error => {
                  console.log(error)
                  commit('setLoading', false)
              })
        },
        unregisterUserForMeetup({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if(!user.fbKeys) {
                return
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
              .remove()
              .then(() => {
                  commit('setLoading', false)
                  commit('unregisterUserForMeetup', payload)
              })
              .catch(error => {
                  console.log(error)
                  commit('setLoading', false)
              })
        },
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
                          location: obj[key].location,
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
        updateMeetupData({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if(payload.title) {
                updateObj.title = payload.title
            }
            if(payload.description) {
                updateObj.description = payload.description
            }
            if(payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
              .then(() => {
                  commit('setLoading',false)
                  commit('updateMeetup', payload)
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
                        registerMeetups: [],
                        fbKeys: {}
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
                        registerMeetups: [],
                        fbKeys:{}
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
            commit('setUser', {id: payload.uid, registerMeetups:[],fbKeys:{}})
        },
        fetchUserData ({commit, getters}) {
            commit('setLoading', true)
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
              .then(data => {
                  const dataPairs = data.val()
                  let registerMeetups = []
                  let swappedPairs = []
                  for (let key in dataPairs) {
                      registerMeetups.push(dataPairs[key])
                      swappedPairs[dataPairs[key]] = key
                  }
                  const updateUser = {
                      id: getters.user.id,
                      registerMeetups: registerMeetups,
                      fbKeys: swappedPairs
                  }
                  commit('setLoading', false)
                  commit('setUser',updateUser)
                  console.log(registerMeetups)
                  console.log(swappedPairs)
              })
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