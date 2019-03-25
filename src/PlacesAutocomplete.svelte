<input class="{styleClass}" {placeholder} ref:search type="text" disabled="{disabled}" on:change="change()" />

<script>
  export default {
    props: ['apiKey'],

    data () {
      return {
        apiKey: undefined,
        placeholder: 'Location',
        styleClass: '',
        value: undefined,
        options: {
          types: ['(regions)'],
          fields: ['geometry', 'formatted_address']
        },
        disabled: true,
        provider: 'BEYONK',
        lib: '@beyonk/svelte-googlemaps'
      }
    },

    async oncreate () {
      const { provider, lib } = this.get()
      await window[provider][lib].loader
      this.initialise()
    },

    methods: {
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

        this.set({ autocomplete, disabled: false })
        
        autocomplete.addListener('place_changed', () => {
          const { autocomplete } = this.get()
          const place = autocomplete.getPlace()
          this.set({ value: place })
          this.fire('update', { place })
        })

        google.maps.event.addDomListener(search, 'blur', this.fire('blur'))
      }
    }
  }
</script>