<div class="map" ref:map></div>

<style>
  .map {
    height: 100%;
    width: 100%;
  }
</style>

<script>
  export default {
    props: ['apiKey'],

    data () {
      return {
        map: undefined,
        apiKey: undefined,
        placeholder: 'Location',
        styleClass: '',
        value: undefined,
        styles: [],
        center: undefined,
        provider: 'BEYONK',
        lib: '@beyonk/svelte-googlemaps'
      }
    },

    async oncreate () {
      const { lib, provider } = this.get()
      await window[provider][lib].loader
      this.initialise()
    },

    methods: {
      getDomBounds () {
        const { map } = this.refs
        return map.getBoundingClientRect()
      },

      getDefaultView () {
        const { map } = this.refs
        return map.ownerDocument.defaultView
      },

      setHeight (height) {
        const { map } = this.refs
        map.style.height = height
      },

      setMaxHeight (height) {
        const { map } = this.refs
        map.style.maxHeight = height
      },

      // change () {
      //   this.fire('dirty')
      //   this.fire('update', { place: undefined })
      //   this.set({ value: undefined })
      // },

      setCentre (latLng) {
        const { map } = this.refs
        map.setCenter(latLng)
      },

      getInternalMap() {
        const { map } = this.get()
        return map
      },

      initialise () {
        const { options } = this.get()

        const google = window['google']
        const map = new google.maps.Map(this.refs.map, options)

        this.set({ map })

        google.maps.event.addListener(map, 'dragend', function () {
          const latLng = map.getCenter()
          this.set({ center: latLng })
          this.fire('recentre', { latLng })
        }.bind(this))

        this.fire('ready')
      }
    }
  }
</script>