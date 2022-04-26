<a href="https://beyonk.com">
    <br />
    <br />
    <img src="https://user-images.githubusercontent.com/218949/144224348-1b3a20d5-d68e-4a7a-b6ac-6946f19f4a86.png" width="198" />
    <br />
    <br />
</a>

## Svelte Social Auth

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) (https://circleci.com/gh/beyonk-adventures/svelte-social-auth) [![svelte-v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

Google and Facebook Auth

SvelteKit
SSR Ready
Svelte v3

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

### Customising the buttons

Buttons have default graphics and text, however, both buttons are slotted, so simply put the button content you want inside:

```
<GoogleAuth>
  <div>my custom content</div>
</GoogleAuth>
```

### Attributes

Common attributes:

| Attribute | Description | Type | Default |
|---|---|---| --- |
| text | Text of the sign-in button | string | 'Sign in with <Provider>' |

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

Put your app and client ids in an `.env` file

```bash
.env.local
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
VITE_FACEBOOK_APP_ID=<your-facebook-app-id>
``

```bash
pnpm dev
```