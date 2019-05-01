import retry from '@beyonk/promise-retry'

const version = 'v3.2'
const provider = 'BEYONK'
const lib = '@beyonk/svelte-social-auth/facebook'
const libUrl = '//connect.facebook.net/en_GB/sdk.js'

function login (dispatch) {
  const FB = window['FB']
  FB.login(function (response) {
    if (response.authResponse) {
      FB.api('/me', function (me) {
        dispatch('auth-success', { 
          authResponse: response.authResponse,
          user: me
        })
      });
    } else {
      dispatch('auth-info', { response })
    }
  }, {scope: 'email,user_likes'})
}

function init (appId) {
  const FB = window['FB']
  FB.init({
    appId      : appId,
    cookie     : true,
    xfbml      : true,
    version    : version
  })
}

async function mount (appId, dispatch) {
  window[provider] = window[provider] || {}
  window[provider][lib] = window[provider][lib] || {}

  if (window[provider][lib].loader) {
    init(appId)
    return
  }

  window[provider][lib].loader = retry (
    () => new Promise(
      (resolve, reject) => {
        const script = document.createElement('script')
        script.onerror = function (e) {
          console.error(e)
          dispatch('init-error', { error: e })
          reject()
        }
        script.async = true
        script.src = libUrl
        script.onload = resolve
        document.body.appendChild(script)
      }
    )
  )

  await window[provider][lib].loader
  init(appId)
}

export {
  login,
  mount
}