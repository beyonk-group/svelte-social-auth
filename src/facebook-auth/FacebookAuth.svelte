<button on:click={() => login(dispatch) }>
  <SignInButton />
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
  import SignInButton from './SignInButton.svelte'
  import { onMount, createEventDispatcher } from 'svelte'
  import { login, mount } from './common.js'

  const dispatch = createEventDispatcher()

  export let appId

  onMount(() => {
    mount(appId, dispatch)
  })
</script>