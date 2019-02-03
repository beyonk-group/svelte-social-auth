<svelte:head>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
</svelte:head>
<header>
	<div class="container">
		<div class="row">
			<div class="col-lg-2 col-xs-12 left">
				<div id="logo">
					<img src="{logo}" alt="vdoc">
				</div>
			</div>
			<div class="col-lg-8 col-md-7 col-xs-12">
				<div class="slogan">
					Svelte Google Maps Developer Documentation
				</div>
			</div>
			<div class="col-lg-2 col-md-3 col-xs-12 right">
				<a class="btn" href="http://www.github.com/beyonk-adventures/svelte-googlemaps">Github</a>
			</div>
		</div>
	</div>
</header>
<section class="content">
	<div class="container">
		<div class="content-wrap">
			<div class="row">
				<aside>
					<div class="menu-box">
						<h4>Navigation</h4>	
						<nav>
							<ul>
								<li><a href="#places-autocomplete" on:click="navigate('places-autocomplete')" class:current="page === 'places-autocomplete'">Places Autocomplete</a></li>
							</ul>					
						</nav>
					</div>
				</aside>
				<div class="content-info">
					<div class="section-txt" id="places-autocomplete">
						<PlacesAutocomplete apiKey="%API_KEY%" bind:value="place" />
            {#if place}
              <dl>
								<dt>Name:</dt>
								<dd>{place.formatted_address}</dd>
								<dt>Geolocation:</dt>
								<dd>lat: {place.geometry.location.lat()}, lng: {place.geometry.location.lng()}</dd>
							</dl>
            {/if}
          </div>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="footer-area">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 center">
				Powered by Beyonk Open Source
			</div>
		</div>
	</div>
</div>
<footer>
	<div class="container">
		<div class="row">
			<div class="col-lg-12 center">
				© 2018 Beyonk. All rights reserved.
			</div>
		</div>
	</div>
</footer>

<script>
  import './normalize.css'
  import './prettify.css'
  import './style.css'

  import logo from './logo.svg'

  export default {
    data () {
      return {
        logo,
        page: 'about',
        place: undefined
      }
    },

    methods: {
      navigate (page) {
        this.set({ page })
      }
    },

    components: {
      PlacesAutocomplete: '../src/PlacesAutocomplete.svelte'
    }
  }
</script>