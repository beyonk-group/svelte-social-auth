<fb:login-button scope="public_profile,email" data-size="large" onlogin="checkLoginState();">
</fb:login-button>

<script>
  import retry from '@beyonk/promise-retry'
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let appId
  export let version = 'v3.2'
  const provider = 'BEYONK'
  const lib = '@beyonk/svelte-social-auth/facebook'
  const libUrl = '//connect.facebook.net/en_GB/sdk.js'

  function statusChangeCallback (response) {
    const FB = window['FB']
    if (response.status === 'connected') {
      FB.api('/me', function (response) {
        dispatch('auth-success', { user: response })
      });
    } else {
      dispatch('auth-info', { response })
    }
  }

  function checkLoginState () {
    const FB = window['FB']
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response)
    })
  }

  onMount(async => {
    window[provider] = window[provider] || {}
    window[provider][lib] = window[provider][lib] || {}

    if (window[provider][lib].loader) {
      return
    }

    const callback = 'fbAsyncInit'

    const url = [
      libUrl
    ].join('')

    window[provider][lib].loader = retry (() => new Promise((resolve, reject) => {
      window['checkLoginState'] = checkLoginState
      window[callback] = function () {
        try {
          const FB = window['FB']
          FB.init({
            appId      : appId,
            cookie     : true,
            xfbml      : true,
            version    : version
          })

          FB.getLoginStatus(function(response) {
            console.log('getting login status')
            statusChangeCallback(response)
          })

          console.log('resolving')
          resolve()
          delete window[callback]
        } catch (e) {
          console.error(e)
          dispatch('init-error', { error: e })
        }
      }

      const script = document.createElement('script')
      script.onerror = function (e) {
        console.error(e)
        dispatch('init-error', { error: e })
        reject()
      }
      script.async = true
      script.src = url
      document.body.appendChild(script)
    }))
  })
</script>