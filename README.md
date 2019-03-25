<p align="center">
  <img width="186" height="90" src="https://user-images.githubusercontent.com/218949/44782765-377e7c80-ab80-11e8-9dd8-fce0e37c235b.png" alt="Beyonk" />
</p>

## Svelte Google Maps

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![CircleCI](https://circleci.com/gh/beyonk-adventures/svelte-googlemaps.svg?style=shield)](https://circleci.com/gh/beyonk-adventures/svelte-googlemaps)

Maps and Places components in Vanilla JS (or Svelte)

Particular focus on efficient loading of Google components in an SPA.

SSR Ready

## WIP

Documentation is a WIP. Be prepared to examine the source code to get any use out of this right now!

The `GoogleSdk` components handles map loading, callbacks, and api deduplication, and the `GoogleMap` and `GooglePlaceSAutocomplete` components use the resulting API.

## Usage

### To use within a Svelte application:

```bash
npm i -D @beyonk/svelte-notifications
```

```js
import Notifications from '@beyonk/svelte-notifications'

export default {
	components: {
    Notifications
  }
}
```

## Usage

### Map

```jsx
<GoogleSdk apiKey="your-maps-api-key" />
<GooglePlacesAutocomplete />
<GoogleMap />

<script>
  import { GoogleSdk, GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps'

  export default {
    components: {
      GoogleSdk,
      GoogleMap,
      GooglePlacesAutocomplete
    }
  }
</script>
```
