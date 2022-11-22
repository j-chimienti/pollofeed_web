// eslint-disable-next-line no-unused-vars
import { WEBSOCKET_CLOSED } from "src/store/mutations"
import _get from "lodash.get"

export function WebsocketService(store, handleWebsocketMessage = console.log) {
  this.ws = null
  this._send = (msg) => {
    const rs = _get(this.ws, "readyState", -1)
    if (rs === 1) {
      this.ws.send(typeof msg === "string" ? msg : JSON.stringify(msg))
    }
    return this.ws.readyState
  }

  this.open = (url) => {
    return new Promise((resolve, reject) => {
      console.log("open ws " + url)
      this.ws = new WebSocket(url)
      this.ws.onopen = () => {
        console.log("ws open")
        resolve(this)
      }
      this.ws.onerror = (e) => {
        console.log("Error in websocket", e)
        store.commit(WEBSOCKET_CLOSED)
        reject(e)
      }
      this.ws.onmessage = (e) => {
        handleWebsocketMessage(store, JSON.parse(e.data))
      }

      this.ws.onclose = (e) => {
        store.commit(WEBSOCKET_CLOSED)
        console.log("ws closed", e)
      }
    })
  }
}
