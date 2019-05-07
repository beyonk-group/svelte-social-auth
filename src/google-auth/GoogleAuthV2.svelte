<button ref:signinCta>
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
    padding: 1px;
    cursor: pointer;
  }
</style>

<script>
  import { mount, defaultText } from './common'

  export default {
    props: [ 'clientId' ],

    data () {
      return {
        text: defaultText
      }
    },

    oncreate () {
      const { clientId } = this.get()
      mount(clientId, this.refs.signinCta, this.fire.bind(this))
    },

    components: {
      SignInButton: './SignInButton.svelte'
    }
  }
</script>