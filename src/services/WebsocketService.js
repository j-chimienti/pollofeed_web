// eslint-disable-next-line no-unused-vars
export function WebsocketService(
  store,
  host,
  handleWebsocketMessage = console.log
) {
  this.ws = new WebSocket(host)
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
        open().then(() => this.ws.send(MSG))
      } else {
        this.ws.send(MSG)
        resolve(MSG)
      }
    })
  }

  this.ws.onmessage = (e) => {
    const { data } = e
    const json = JSON.parse(data)
    handleWebsocketMessage(store, json)
  }

  this.ws.onclose = (e) => {
    console.log(
      `closed ws time=${openedTime} ${new Date()} ${openedTime - new Date()}`,
      e
    )
  }

  let openedTime
  this.open  = function () {
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => {
        console.log("ws open")
        openedTime = new Date()
        resolve(this)
      }
      this.ws.onerror = (e) => {
        console.error("Error in websocket", e)
        reject(e)
      }
    })
  }
  return this.open()
}
