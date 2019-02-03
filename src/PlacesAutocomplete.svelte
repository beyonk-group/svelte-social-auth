<input class="{styleClass}" {placeholder} ref:search type="text" disabled="{disabled}" on:change="change()" />

<script>
  const provider = 'BEYONK'

  export default {
    props: ['apiKey'],

    data () {
      return {
        apiKey: undefined,
        placeholder: 'Location',
        lib: '@beyonk/svelte-google-maps',
        libraries: ['places'],
        styleClass: '',
        value: undefined,
        options: {
          types: ['(regions)'],
          fields: ['geometry', 'formatted_address']
        },
        disabled: true
      }
    },

    async oncreate () {
      const { lib } = this.get()
      window[provider] = window[provider] || {}
      window[provider][lib] = window[provider][lib] || {}
      if (!window[provider][lib].loaded) {
        await this.addTag()
      }
      this.initialise()
    },

    methods: {
      addTag () {
        const { version, apiKey, libraries } = this.get()
        const url = [
          '//maps.googleapis.com/maps/api/js?',
          apiKey ? `key=${apiKey}&` : '',
          `libraries=${libraries.join(',')}`
        ].join('')

        return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.onload = resolve
          script.onerror = reject
          script.async = true
          script.src = url
          document.body.appendChild(script)
        })
      },

      change () {
        this.fire('dirty')
        this.fire('update', { place: undefined })
        this.set({ value: undefined })
      },

      initialise () {
        const { options, update } = this.get()
        const { search } = this.refs
        const google = window['google']
        const autocomplete = new google.maps.places.Autocomplete(
          search,
          options
        )
        
        autocomplete.addListener('place_changed', () => {
          const { autocomplete } = this.get()
          const place = autocomplete.getPlace()
          this.set({ value: place })
          this.fire('update', { place })
        })

        google.maps.event.addDomListener(search, 'blur', this.fire('blur'))

        this.set({ autocomplete, disabled: false })
      }
    }
  }
</script>