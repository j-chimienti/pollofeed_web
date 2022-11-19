function getProxy() {
  if (process.env.NODE_ENV === "development") return window.location.origin
  return window.location.origin + "/api/?apiurl=https://api.pollofeed.com"
}

const proxyUrl = getProxy()

export async function oauthLogin(provider) {
  return fetch(proxyUrl + `/api/auth/authorize/${provider}`).then((res) =>
    res.json()
  )
}

export async function oauthCallbackV2(provider, { code, state }) {
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code, state, provider }),
  }
  return fetch(proxyUrl + `/api/auth/v2/callback/${provider}`, options).then(
    (res) => res.json()
  )
}

export async function resumeSession() {
  return fetch(proxyUrl + "/api/auth/resumeSession")
}

export async function signup(email, password) {
  const p = proxyUrl + "/api/auth/signup"
  return fetch(p, {
    method: "post",
    body: JSON.stringify({ password: password, email }),
    headers: { "content-type": "application/json" },
  })
}

export async function login(body) {
  return fetch(proxyUrl + "/api/auth/login", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  })
}

export async function logout() {
  return fetch(proxyUrl + "/api/auth/logout", { method: "get" })
}
