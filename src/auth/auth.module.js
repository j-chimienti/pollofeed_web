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
  loginModuleVisible: (state) => state.loginModuleVisible,
  authenticated: (state) => state.authenticated,
  authError: (state) => state.authError,
  requestingSession: (state) => state.requestingSession,
  email: state => _get(state.user, "email", "N/A"),

  picture: state => _get(state.user, "picture", null),
}


const getInitialState = () => {
  return {
    authenticated: false,
    loginModuleVisible: false,
      user: null, //{playerAccount, session}
  }
}
const state = getInitialState()
// resumeSession returns:

//{
//   "session" : {
//     "id" : "CXSe--EED6aRBfVXFiHvcnCpa3oAJpBL_RZJbbZfjnU=",
//     "playerAccountId" : "google-oauth2|101687464479583982435",
//     "createdAt" : "2021-12-29T14:13:03.744Z",
//     "modifiedAt" : "2022-06-15T00:24:29.687Z"
//   },
//   "playerAccount" : {
//     "email" : "joe.chimienti@eventdynamic.com",
//     "id" : "google-oauth2|101687464479583982435",
//     "lightningAddress" : "joe.chimienti@eventdynamic.com_IjzUcB2Z1TE=",
//     "createdAt" : "2021-12-29T14:13:03.744Z",
//     "timesAccessed" : 10,
//     "lastAccess" : "2022-06-15T00:27:14.030Z"
//   }
// }
async function onAuthSuccess({ commit, dispatch }, user) {
  commit(LOGIN_MODAL_VISIBLE, false)
  commit(AUTHENTICATED, user.playerAccount)
  // todo: hardcode
  if (_get(user, "playerAccount.email", "").includes("session")) {
    // commit(PLAYING_FOR_FREE, true)
  }
  return user;
  //
  // return await dispatch(OPEN_WEBSOCKET);
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
  [LOGOUT]({ commit }) {
    return apiService.logout().finally(() => {
      // todo: reset root state
      window.location.reload()
    })
  },
}



const mutations = {
  ['auth/RESET_STATE'](s) { Object.assign(s, getInitialState()) },
  [REQUESTING_SESSION](state, requesting = false) {
    state.requestingSession = requesting
    // state.user = null
    // state.authenticated = false
  },
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
