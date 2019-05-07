<button bind:this={signinCta}>
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
  import SignInButton from './SignInButton.svelte'
  import { onMount, createEventDispatcher } from 'svelte'
  import { mount, defaultText } from './common'

  const dispatch = createEventDispatcher()

  let signinCta
  export let clientId
  export let text = defaultText

  onMount(() => {
    mount(clientId, signinCta, dispatch)
  })
</script>