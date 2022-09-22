


export async function oauthLogin(provider, params) {

  return fetch(`/api/callback/${provider}${params}`).then((res) => res.json())
}

export async function resumeSession() {
  const url =  "/api/resumeSession"
  return fetch(url, {
    headers: {
      'Access-Control-Request-Headers': "*"
    }
  })
}

export async function signup(email, password) {
  return fetch('/api/signup', { method: 'post',
    body: JSON.stringify({ password: password, email }), headers: { 'content-type': 'application/json' } })
}

export async function login(body) {
  return fetch('/api/login', { method: 'post', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } })
}

export async function logout() {
  return fetch('/api/logout', { method: 'post' })
}
