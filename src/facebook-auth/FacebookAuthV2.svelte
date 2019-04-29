<button on:click="login()">
  <SignInButton />
</button>

<style>
  button {
    border: 0;
    background-color: #4285F4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    padding: 1px;
  }
</style>

<script>
  import { login, mount } from './common.js'

  export default {
    props: [ 'appId' ],

    oncreate () {
      const { appId } = this.get()
      mount(appId, this.fire)
    },

    methods: {
      login () {
        login(this.fire)
      }
    },

    components: {
      SignInButton: './SignInButton.svelte'
    }
  }
</script>