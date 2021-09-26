
// eslint-disable-next-line no-unused-vars
export function WebsocketService(store, host, handleWebsocketMessage = console.log) {
  this.ws = new WebSocket(host)
  this._send = (msg) => {
    const MSG = typeof msg === "string" ?  JSON.stringify({action: msg}) :
      typeof msg === "object" ? JSON.stringify(msg) :
        msg
    // todo: reopen
    if (this.ws.readyState !== 1) {
      console.error("ws is not ready")
    }
    this.ws.send(MSG)
  }

  this.ping = () => this._send({action: "ping"})

  this.ws.onmessage = e => {
    const {data} = e
    const json = JSON.parse(data)
    handleWebsocketMessage(store, json)
  }

  this.ws.onclose = e => {
    console.log("closed ws", e)
    clearInterval(this.pingInterval)
  }

  return new Promise((resolve, reject) => {
    this.ws.onopen = () => {
      console.log("ws open")
      this.pingInterval = setInterval(() => this.ping(), 45 * 1000)
      resolve(this)
    }
    this.ws.onerror = e => {
      console.error("Error in websocket", e)
      clearInterval(this.pingInterval)
      reject(e)
    }
  })





}
