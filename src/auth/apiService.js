
const proxyUrl = window.location.origin +  "/api/?apiurl=https://api.pollofeed.com"

export async function oauthLogin(provider) {
  return fetch( proxyUrl + `/api/authorize/${provider}`).then((res) => res.json())
}


export async function oauthCallback(provider, params) {

  return fetch( proxyUrl + `/api/callback/${provider}${params}`).then((res) => res.json())
}



export async function resumeSession() {
  return fetch(proxyUrl +  "/api/resumeSession")
}

export async function signup(email, password) {
  const p = proxyUrl + "/api/signup"
  return fetch(p, { method: 'post',
    body: JSON.stringify({ password: password, email }), headers: { 'content-type': 'application/json' } })
}

export async function login(body) {
  return fetch(proxyUrl +  "/api/login", { method: 'post', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } })
}

export async function logout() {
  return fetch(proxyUrl +  "/api/logout", { method: 'get' })
}
