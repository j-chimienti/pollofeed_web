import { DELAY_FEEDING } from "./actions"
import {
  ADD_FEED_TOKEN,
  REMOVE_FEED_TOKEN,
  SET_DELAYED_FEEDING,
  SET_USE_TOKEN_NOW,
} from "./mutations"
import { FEED_TOKEN_KEY } from "src/constants"
import { LocalStorage, Notify } from "quasar"

import get from "lodash.get"

const makefeedTokens = () => {
  try {
    const f = LocalStorage.getItem(FEED_TOKEN_KEY)
    if (Array.isArray(f))
      return f.filter((item) => get(item, "token", "").length > 12)
    else return []
  } catch (e) {
    return []
  }
}

export const pollofeedModule = {
  getters: {
    ordersByDay: (state) => state.ordersByDay,
    feedTokens: (state) => state.feedTokens,
    delayedFeedingResponse: (state) => state.delayedFeedingResponse,
    delayFeeding: (state) => state.delayFeeding,
    modals: (state) => state.modals,
    showFeedNow: (state) => state.showFeedNow,
  },
  state: {
    delayFeeding: "not_delayed",
    feedTokens: makefeedTokens(),
    showFeedNow: null, // feed token to use now
    // admin
    delayedFeedingResponse: null,
  },
  mutations: {
    [SET_DELAYED_FEEDING](state, delayFeeding) {
      state.delayFeeding = delayFeeding
    },

    [ADD_FEED_TOKEN](state, feedToken) {
      if (!state.feedTokens.find((t) => t.label === feedToken.label))
        state.feedTokens.push(feedToken)
      LocalStorage.set(FEED_TOKEN_KEY, state.feedTokens)
    },
    [REMOVE_FEED_TOKEN](state, labelOrTokenOrPaymentHash) {
      state.feedTokens = state.feedTokens
        .filter((ft) => ft.label !== labelOrTokenOrPaymentHash)
        .filter((ft) => ft.token !== labelOrTokenOrPaymentHash)
        .filter((ft) => ft.payment_hash !== labelOrTokenOrPaymentHash)
      LocalStorage.set(FEED_TOKEN_KEY, state.feedTokens)
    },
    // show = option[string]
    [SET_USE_TOKEN_NOW](state, show) {
      state.showFeedNow = show
      if (show !== null) {
        console.log(this.state.paymentType)
        this.state.paymentType = "DELAYED"
        console.log(this.state.paymentType)
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
