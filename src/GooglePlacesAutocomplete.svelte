<input aria-label="{ariaLabel}" class="{styleClass}" {placeholder} ref:search type="text" disabled="{disabled}" bind:value="viewValue" on:blur="blur()" />

<script>
  export default {
    props: ['apiKey'],

    data () {
      return {
        ariaLabel: 'location',
        apiKey: undefined,
        placeholder: 'Location',
        styleClass: '',
        value: null,
        viewValue: null,
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
      clear () {
        this.set({
          value: null,
          viewValue: null,
          currentPlace: null
        })
        this.fire('clear')
      },

      blur () {
        this.fire('blur')
        const { viewValue, currentPlace } = this.get()
        if (viewValue !== currentPlace) {
          this.clear()
        }
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
          const { autocomplete, viewValue } = this.get()
          const place = autocomplete.getPlace()
          if (!!place.geometry) {
            const { formatted_address } = place
            this.set({ value: place, viewValue: formatted_address, currentPlace: formatted_address })
            this.fire('placeChanged', { place })
          } else {
            this.clear()
          }
        })

        this.fire('ready')
      }
    }
  }
</script>