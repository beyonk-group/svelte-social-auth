import retry from '@beyonk/promise-retry'

const provider = 'BEYONK'
const lib = '@beyonk/svelte-social-auth/google'
const libUrl = '//apis.google.com/js/platform.js'

function onAuthenticate (GoogleAuth, signinCta, dispatch) {
  GoogleAuth.attachClickHandler(signinCta, {},
    () => {
      console.error('auth success')
      dispatch('auth-success', {
        user: GoogleAuth.currentUser.get()
      })
    },
    e => {
      console.error('auth failure', e)
      dispatch('auth-failure', {
        error: e
      })
    }
  )
}

function init (clientId, signinCta, dispatch) {
  const gapi = window['gapi']
  gapi.load('auth2', async function () {
    const GoogleAuth = gapi.auth2.init({ client_id: clientId })
    GoogleAuth.then(
      () => {
        onAuthenticate(GoogleAuth, signinCta, dispatch)
      },
      e => {
        console.error('gauth initialisation error', e)
        dispatch('init-error', { error: e })
      })
  })
}

async function mount (clientId, signinCta, dispatch) {
  window[provider] = window[provider] || {}
  window[provider][lib] = window[provider][lib] || {}

  if (window[provider][lib].loader) {
    init(clientId, signinCta, dispatch)
    return
  }

  const callback = `gauth_${clientId}_cb`.replace(/\W/g, '')

  const url = [
    libUrl,
    `?onload=${callback}`
  ].join('')

  window[provider][lib].loader = retry (() => new Promise((resolve, reject) => {
    window[callback] = function () {
      init(clientId, signinCta, dispatch)
      resolve()
      delete window[callback]
    }
    const script = document.createElement('script')
    script.onerror = reject
    script.async = true
    script.src = url
    document.body.appendChild(script)
  }))
}

const defaultText = 'Sign in with Google'

export {
  mount,
  defaultText
}
