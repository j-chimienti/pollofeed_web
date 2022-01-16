import {DELAY_FEEDING} from "./actions";
import {
  ADD_FEED_TOKEN,
  DELAYED_FEEDING_FAILURE,
  DELAYED_FEEDING_SUCCESS,
  FEEDER_DONE_SPINNING,
  FEEDER_SPINNING,
  REMOVE_FEED_TOKEN,
  SET_DELAYED_FEEDING
} from "./mutations";

export const pollofeedModule = {
  getters: {
    isDelayedOrder: state => state.delayFeeding === "delayed",
    ordersByDay: state => state.ordersByDay,
    feedTokens: state => state.feedTokens,
    delayedFeedingResponse: state => state.delayedFeedingResponse,
    delayFeeding: state => state.delayFeeding,
    modals: state => state.modals,
  },
  state: {
    delayFeeding: "not_delayed",
    feedTokens: [],
    modals: {
      success: {
        visible: false
      },
      delayFeeding: {
        visible: false
      }
    },
    // admin
    delayedFeedingResponse: null,
  },
  mutations: {

    [SET_DELAYED_FEEDING] (state, delayFeeding) { state.delayFeeding = delayFeeding },
    [FEEDER_DONE_SPINNING](state) {  state.feederSpinning = false },
    [FEEDER_SPINNING](state) {  state.feederSpinning = true },

    [ADD_FEED_TOKEN](state, feedToken) {
      if (!state.feedTokens.find(t => t === feedToken))
        state.feedTokens.push(feedToken)
    },
    [REMOVE_FEED_TOKEN](state, token) { state.feedTokens = state.feedTokens.filter(ft => ft !== token) },
    [DELAYED_FEEDING_SUCCESS](state, message) { state.delayedFeedingResponse = message },
    [DELAYED_FEEDING_FAILURE](state, message) { state.delayedFeedingResponse = message },

  },
  actions: {

    [DELAY_FEEDING]({getters}, token) {
      getters.websocket._send({WsDelayFeedingRequest: null, token})
    },


  }
}
