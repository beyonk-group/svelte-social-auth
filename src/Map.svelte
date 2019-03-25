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
      change () {
        this.fire('dirty')
        this.fire('update', { place: undefined })
        this.set({ value: undefined })
      },

      initialise () {
        const { options, update, center, styles } = this.get()

        const google = window['google']
        const map = new google.maps.Map(this.refs.map, {
          ... center ? { center } : {},
          zoom: 6,
          // ... styles ? { styles } : {},
          // disableDefaultUI: false,
          // gestureHandling: 'greedy',
          // mapTypeControl: false,
          // streetViewControl: false,
          // rotateControl: false,
          // draggable: true
        })

        this.set({ map })

        google.maps.event.addListener(map, 'dragend', function () {
          const latLng = map.getCenter()
          this.set({ center: latLng })
          this.fire('center', { center })
        }.bind(this))

        this.fire('ready')
      }
    }
  }
</script>