<script>
  export default {
    props: ['apiKey'],

    data () {
      return {
        provider: 'BEYONK',
        lib: '@beyonk/svelte-googlemaps'
      }
    },

    async oncreate () {
      const { lib, provider } = this.get()
      window[provider] = window[provider] || {}
      window[provider][lib] = window[provider][lib] || {}

      if (window[provider][lib].loader) {
        return
      }

      const { version, apiKey, libraries } = this.get()
      const callback = `gmaps_${provider}_${lib}_cb`.replace(/\W/g, '')
      const url = [
        '//maps.googleapis.com/maps/api/js?',
        apiKey ? `key=${apiKey}&` : '',
        `libraries=places&callback=${callback}`
      ].join('')

      window[provider][lib].loader = new Promise((resolve, reject) => {
        window[callback] = function () {
          resolve()
          delete window[callback]
        }
        const script = document.createElement('script')
        script.onerror = reject
        script.async = true
        script.src = url
        document.body.appendChild(script)
      })
    }
  }
</script>