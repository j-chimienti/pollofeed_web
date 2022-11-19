// eslint-disable-next-line no-unused-vars
import { WEBSOCKET_CLOSED } from "src/store/mutations"

export function WebsocketService(
  store,
  host,
  sessionId = null,
  handleWebsocketMessage = console.log
) {
  this.ws = null
  this._send = (msg) => {
    return new Promise((resolve) => {
      const MSG =
        typeof msg === "string"
          ? JSON.stringify({ action: msg })
          : typeof msg === "object"
          ? JSON.stringify(msg)
          : msg
      if (this.ws.readyState !== 1) {
        console.error("ws is not ready")
        new WebsocketService(store, host, handleWebsocketMessage).then(() =>
          this.ws.send(MSG)
        )
      } else {
        this.ws.send(MSG)
        resolve(MSG)
      }
    })
  }

  this.open = function () {
    return new Promise((resolve, reject) => {
      const url = sessionId ? host + "/?session=" + sessionId : host
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
  return this.open()
}
