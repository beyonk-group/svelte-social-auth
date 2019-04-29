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
					Svelte Social Auth Developer Documentation
				</div>
			</div>
			<div class="col-lg-2 col-md-3 col-xs-12 right">
				<a class="btn" href="http://www.github.com/beyonk-adventures/svelte-social-auth">Github</a>
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
								<li><a href="#google-auth" on:click={() => { navigate('google-auth') }} class:current={page === 'google-auth'}>Google Auth</a></li>
								<li><a href="#google-auth" on:click={() => { navigate('facebook-auth') }} class:current={page === 'google-auth'}>Facebook Auth</a></li>
							</ul>					
						</nav>
					</div>
				</aside>
				<div class="content-info">
					{#if page === 'google-auth'}
					<div class="section-txt" id="google-auth">
						<GoogleAuth 
							clientId="%GOOGLE_CLIENT_ID%"
							on:init-error={ev => alert(ev.detail.error.error)}
							on:auth-failure={ev => alert('auth failure')}
							on:auth-success={ev => console.dir(ev.detail.user) }
						/>
          </div>
					{/if}
					{#if page === 'facebook-auth'}
					<div class="section-txt" id="facebook-auth">
						<FacebookAuth 
							appId="%FACEBOOK_APP_ID%"
							on:init-error={ev => alert(ev.detail.error.message)}
							on:auth-failure={ev => alert('auth failure')}
							on:auth-success={ev => console.dir(ev.detail.user) }
						/>
          </div>
					{/if}
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
				© 2019 Beyonk. All rights reserved.
			</div>
		</div>
	</div>
</footer>

<style>
	.map-wrap {
		width: 100%;
		height: 300px;
	}
</style>

<script>
  import './normalize.css'
  import './prettify.css'
  import './style.css'

	import logo from './logo.svg'

	import { GoogleAuth, FacebookAuth } from '../src/components'

	let page = 'google-auth'
	
	function navigate (nextPage) {
		page = nextPage
	}
	
</script>