<button on:click="login()">
  <SignInButton {text} />
</button>

<style>
  button {
    width: 100%;
    border: 0;
    background-color: #4285F4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    padding: 5px 1px;
    cursor: pointer;
  }
</style>

<script>
  import { login, mount, defaultText } from './common.js'

  export default {
    props: [ 'appId' ],

    data () {
      return {
        text: defaultText
      }
    },

    oncreate () {
      const { appId } = this.get()
      mount(appId, this.fire.bind(this))
    },

    methods: {
      login () {
        login(this.fire.bind(this))
      }
    },

    components: {
      SignInButton: './SignInButton.svelte'
    }
  }
</script>