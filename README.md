<a href="https://beyonk.com">
    <br />
    <br />
    <img src="https://user-images.githubusercontent.com/218949/144224348-1b3a20d5-d68e-4a7a-b6ac-6946f19f4a86.png" width="198" />
    <br />
    <br />
</a>

## Svelte Social Auth

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![CircleCI](https://circleci.com/gh/beyonk-adventures/svelte-social-auth.svg?style=shield)](https://circleci.com/gh/beyonk-adventures/svelte-social-auth) [![svelte-v2](https://img.shields.io/badge/svelte-v2-orange.svg)](https://v2.svelte.dev) [![svelte-v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

Google and Facebook Auth

SSR Ready
Svelte v3 + v2

## installation
````npm i @beyonk/svelte-social-auth --save-dev````

## Usage

```jsx
<GoogleAuth clientId="your-google-auth-client-id" on:auth-success={e => console.dir(e.detail.user)} />
<FacebookAuth appId="your-facebook-app-id" on:auth-success={e => console.dir(e.detail.user)} />

<script>
  import { GoogleAuth, FacebookAuth } from '@beyonk/svelte-social-auth'
</script>
```

## Usage with v2

```jsx
<GoogleAuth clientId="your-google-auth-client-id" on:auth-success={e => console.dir(e.detail.user)} />
<FacebookAuth appId="your-facebook-app-id" on:auth-success={e => console.dir(e.detail.user)} />

<script>
  import { GoogleAuth, FacebookAuth } from '@beyonk/svelte-social-auth/src/components.v2.js'
</script>
```

### Attributes

Common attributes:

| Attribute | Description | Type | Default |
|---|---|---| --- |
| text | Text of the sign-in button | string | 'Sign in with <Provider>' |
| buttonBackgroundColor | Hex, Named or rgb version of the button background color | string | '#4285F4' |
| disabledButtonBackgroundColor | Hex, Named or rgb version of the button background color, disabled state | string | 'grey' |
| buttonTextColor | Hex, Named or rgb version of the button text color | string | '#FFFFFF' |
| buttonWidth | %, PX, EM, VW width, or auto for default | string | '100%' |

The attributes for the GoogleAuth component are:

| Attribute | Description | Type | Default |
|---|---|---| --- |
| clientId | Google service account client id | string | - |

The attributes for the FacebookAuth component are:

| Attribute | Description | Type | Default |
|---|---|---| --- |
| appId | Facebook app id | string | - |

### Events

The events fired by the GoogleAuth component are:

| Event | Purpose | Properties |
|---|---|---|
| on:auth-success | User authentication success | { user } |
| on:auth-failure | User authentication failure | { error } |
| on:init-error | Google Auth initialisation failure | { error } |

The events fired by the FacebookAuth component are:

| Event | Purpose | Properties |
|---|---|---|
| on:auth-success | User authentication success | { user } |
| on:auth-failure | User authentication failure | { error } |

### Developing / Contributing

Note that Facebook requires that you have HTTPS locally, despite their documentation to the contrary, so you will need to generate some SSL certs and point rollup config at them.

```bash
GOOGLE_CLIENT_ID=<your-google-client-id> FACEBOOK_APP_ID=<your-facebook-app-id> npm run dev
```
