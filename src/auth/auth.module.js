/* eslint-disable */
import { LOGIN, LOGOUT, OAUTH_AUTHORIZE_CALLBACK, OPEN_WEBSOCKET, RESUME_SESSION, SIGNUP } from "./actions"
import { AUTHENTICATED, LOGIN_MODAL_VISIBLE, REQUESTING_SESSION } from "./mutations"
// eslint-disable-next-line import/no-cycle
import _get  from "lodash.get"
import { Notify } from "quasar"

import * as apiService from './apiService'

const getters = {
  user: (state) => state.user,
  isSessionUser: state => _get(state.user, "email", "").includes("session"),
  loggingIn: (state) => state.loggingIn,
  loginModalVisible: (state) => state.loginModalVisible,
  authenticated: (state) => state.authenticated,
  authError: (state) => state.authError,
  requestingSession: (state) => state.requestingSession,
  email: state => _get(state.user, "email", null),
  sessionId: state => _get(state.user, "sessionId", null),
  picture: state => _get(state.user, "picture", null),
}


const getInitialState = () => {
  return {
    authenticated: false,
    loginModalVisible: false,
      user: null, //{email,sessionId}
  }
}
const state = getInitialState()


/*
{
  "playerAccount" : {
    "email" : "test1@gmail.com",
    "createdAt" : "2022-09-22T04:57:13.884Z",
    "picture" : null,
    "sessionId" : "3NVB3JMIOV7wv8VHzl7LJw=="
  }
}
 */
async function onAuthSuccess({ commit, dispatch }, user) {
  commit(LOGIN_MODAL_VISIBLE, false)
  commit(AUTHENTICATED, user.playerAccount)
  return user;
}

const actions = {
  [OAUTH_AUTHORIZE_CALLBACK]({ commit, dispatch }, params) {
    const provider = "google" // todo: hardcode
    commit(REQUESTING_SESSION, true)
    return apiService.oauthCallback(provider, params)
      .then((user) => onAuthSuccess({ commit, dispatch }, user))
      .then(() =>  this.$router.push({name: "home"}))
      .catch(err => {
        commit("RESET_STATE")
        commit("auth/RESET_STATE")
        return this.$router.push({name: "home"})
      })
  },
  [RESUME_SESSION]({ commit, dispatch }) {
    commit(REQUESTING_SESSION, true)
    return apiService.resumeSession()
      .then((res) => res.json())
      .then((user) => onAuthSuccess({ commit, dispatch }, user))
      .catch(err => {
        console.log("error resume session", err)
      })
  },

  [SIGNUP]({ commit, dispatch }, { password, email }) {
    commit(REQUESTING_SESSION, true)
    return apiService.signup(email, password)
      .then((res) => {
        if (res.status === 201)
        Notify.create({
          type: "positive",
          message: "Created user " + email
        })
        if (!res.ok) {
          res.text().then(t => {
            let message = t
            if (t.includes("error.email")) {
              message = "Invalid email"
            } else if (t === "BadPassword") {
              message = "Bad Password"
            }

          Notify.create({
            type: 'negative',
            message})
          })
        }

        return res

      })
      .then((res) => res.json())
      .then((res) => onAuthSuccess({ commit, dispatch }, res))

  },
  [LOGIN]({ commit, dispatch }, body) {
    commit(REQUESTING_SESSION, true)
    return apiService.login(body)
      .then((res) => ((res.ok) ? res.json() : res.text().then((t) => Promise.reject(new Error(t)))))
      .then((res) => onAuthSuccess({ commit, dispatch }, res))
      .catch((e) => {
        Notify.create({
          type: 'negative',
          message: "Cannot log in" })
      })
  },
  [LOGOUT]({commit}) {
    return apiService.logout().finally(() => {
      commit("auth/RESET_STATE")
    })
  },
}



const mutations = {
  ['auth/RESET_STATE'](s) { Object.assign(s, getInitialState()) },
  [REQUESTING_SESSION](state, requesting = false) { state.requestingSession = requesting },
  [LOGIN_MODAL_VISIBLE](s,v) { s.loginModalVisible = v},
  [AUTHENTICATED](state, user) {
    state.authenticated = true
    state.user = user
    state.requestingSession = false
    state.loginModalVisible = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  // namedSpace: true
}
