import { WEBSOCKET_CLOSED, WEBSOCKET_OPEN } from "src/store/mutations"
import { OPEN_WEBSOCKET } from "src/store/actions"
import { WebsocketService } from "src/services/WebsocketService"
import { websocketMessageFactory } from "src/services/messageFactory"
import _get from "lodash.get"
const wsPath = process.env.VUE_APP_WS_PATH

const getters = {
  websocket: (state) => state.websocket,
  connectedToWebsocket: (state) => {
    const readyState = _get(state.websocket, "ws.readyState", 0)
    return readyState === 1
  },
}

const state = {
  websocket: null,
}

const mutations = {
  [WEBSOCKET_OPEN](state, ws) {
    state.websocket = ws
  },
  [WEBSOCKET_CLOSED](state) {
    state.websocket = null
  },
}

const actions = {
  [OPEN_WEBSOCKET](store) {
    const { commit } = store
    return new WebsocketService(store, wsPath, websocketMessageFactory)
      .then((ws) => {
        commit(WEBSOCKET_OPEN, ws)
      })
      .catch((err) => {
        console.error(err)
        commit(WEBSOCKET_CLOSED)
      })
  },
}

export const wsModule = { state, mutations, actions, getters }
