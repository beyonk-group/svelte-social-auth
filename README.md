<p align="center">
  <img width="186" height="90" src="https://user-images.githubusercontent.com/218949/44782765-377e7c80-ab80-11e8-9dd8-fce0e37c235b.png" alt="Beyonk" />
</p>

## Svelte Social Auth

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![CircleCI](https://circleci.com/gh/beyonk-adventures/svelte-social-auth.svg?style=shield)](https://circleci.com/gh/beyonk-adventures/svelte-social-auth)

Google and Facebook Auth

SSR Ready
Svelte v3

## Usage

### Google Auth

```jsx
<GoogleAuth clientId="your-google-auth-client-id" on:auth-success={e => console.dir(e.detail.user)} />

<script>
  import { GoogleAuth } from '@beyonk/svelte-social-auth'
</script>
```

### Attributes

The attributes for the GoogleAuth component are:

| Attribute | Description | Type | Default |
|---|---|---| --- |
| clientId | Google service account client id | string | - |

### Events

The events fired by the GoogleAuth component are:

| Event | Purpose | Properties |
|---|---|---|
| on:auth-success | User authentication success | { user } |
| on:auth-failure | User authentication failure | { error } |
| on:init-error | Google Auth initialisation failure | { error } |

### Developing / Contributing

```bash
npm run dev
```