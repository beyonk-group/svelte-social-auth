import retry from '@beyonk/promise-retry'

const version = 'v3.2'
const provider = 'BEYONK'
const lib = '@beyonk/svelte-social-auth/facebook'
const libUrl = '//connect.facebook.net/en_GB/sdk.js'

function login (dispatch) {
  const FB = window['FB']
  FB.login(function (response) {
    if (response.status === 'connected') {
      const authResponse = response.authResponse
      const userId = authResponse.userID
      const accessToken = authResponse.accessToken

      dispatch('auth-success', { 
        accessToken,
        userId
      })
    } else {
      dispatch('auth-info', { response })
    }
  }, { scope: 'email,user_likes,public_profile' })
}

function init (appId) {
  const FB = window['FB']
  FB.init({
    appId      : appId,
    cookie     : true,
    xfbml      : false,
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

const defaultText = 'Sign in with Facebook'

export {
  login,
  mount,
  defaultText
}
