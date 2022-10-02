import { DELAY_FEEDING } from "./actions"
import { ADD_FEED_TOKEN, REMOVE_FEED_TOKEN, SET_DELAYED_FEEDING, SET_USE_TOKEN_NOW } from "./mutations"
import { FEED_TOKEN_KEY } from "src/constants"
import { LocalStorage, Notify } from "quasar"
import { FEEDINGS } from "src/store/mutations"

const makefeedTokens = () => {
  try {
    const f = LocalStorage.getItem(FEED_TOKEN_KEY)
    if (Array.isArray(f))
      return f.filter((item) => typeof item === 'string')
    else return []
  } catch (e) {
    return []
  }
}

export const pollofeedModule = {
  getters: {
    feedings: state => state.feedings,
    feedTokens: (state) => state.feedTokens,
    delayedFeedingResponse: (state) => state.delayedFeedingResponse,
    delayFeeding: (state) => state.delayFeeding,
    modals: (state) => state.modals,
    showFeedNow: (state) => state.showFeedNow,
  },
  state: {
    feedings: 1,
    delayFeeding: "not_delayed",
    feedTokens: makefeedTokens(),
    showFeedNow: null, // feed token to use now
    // admin
    delayedFeedingResponse: null,
  },
  mutations: {
    [FEEDINGS](s, f) { s.feedings = f},
    [SET_DELAYED_FEEDING](state, delayFeeding) {
      state.delayFeeding = delayFeeding
    },

    [ADD_FEED_TOKEN](state, feedToken) {
      const trimmed = feedToken.trim().replaceAll(new RegExp(/"/g), "")
      if (!state.feedTokens.find((t) => t === trimmed))
        state.feedTokens.push(trimmed)
      LocalStorage.set(FEED_TOKEN_KEY, state.feedTokens)
    },
    [REMOVE_FEED_TOKEN](state, labelOrTokenOrPaymentHash) {
      const ft = state.feedTokens
        .filter((ft) => ft.label !== labelOrTokenOrPaymentHash)
        .filter((ft) => ft.token !== labelOrTokenOrPaymentHash)
        .filter((ft) => ft.payment_hash !== labelOrTokenOrPaymentHash)
        .filter((ft) => ft !== labelOrTokenOrPaymentHash)
        .filter((ft) => ft.trim() !== labelOrTokenOrPaymentHash.trim())

      state.feedTokens = ft
      LocalStorage.set(FEED_TOKEN_KEY, ft)
    },
    // show = option[string]
    [SET_USE_TOKEN_NOW](state, show) {
      state.showFeedNow = show
      if (show !== null) {
        state.paymentType = "TOKENS"
      }
    },
  },
  actions: {
    [DELAY_FEEDING]({ getters }, token) {
      if (token)
        getters.websocket._send({ WsDelayFeedingRequest: null, token: token })
      else
        Notify.create({
          message: "Bad request " + token,
          type: "warning",
        })
    },
  },
}
