<button bind:this={signinCta}>
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
  import SignInButton from './SignInButton.svelte'
  import { onMount, createEventDispatcher } from 'svelte'
  import { mount } from './common'

  const dispatch = createEventDispatcher()

  let signinCta
  export let clientId

  onMount(() => {
    mount(clientId, signinCta, dispatch)
  })
</script>