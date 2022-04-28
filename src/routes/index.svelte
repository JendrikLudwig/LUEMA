<script>
    import {currentUser} from "../stores/stores.js"
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';

    //Components
    import Header from "../components/main/header.svelte"
    import TinyButton from "../components/main/tiny_button.svelte"
    import Navbar from "../components/nav/navbar.svelte"

    //Icons
    import AlertIcon from "../../static/icons/ico_alert.png"
    import SettingsIcon from "../../static/icons/ico_settings.png"
    import SignoutIcon from "../../static/icons/ico_signout.png"

  

    let user;
    currentUser.subscribe(val => user = val);
    if(browser && (user == "null" || user == null)) goto("/signin");

    function signout(){
      currentUser.update(() => null);
      window.location.href = "/"
    }
    
</script>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #page_container {
    margin: 3rem 0 7rem 0;
  }

  :global(html) {
    background-color: #F8F8F8;
  }

  :global(p) {
    font-family: 'Montserrat', sans-serif;
  }
  
  :global(body) {
    margin: 0 1rem;
  }

  #button_bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -0.25rem;
  }



</style>


<svelte:head>
  <title>WasEssenWirHeute</title>
</svelte:head>

{#if browser}

<div id="page_container">
  <Navbar active=1/>

  <Header username={JSON.parse(user)?.name} id={JSON.parse(user)?.id}></Header>
  <div id="button_bar">
    <TinyButton text="Nachrichten" icon={AlertIcon}/>
    <TinyButton text="Optionen" icon={SettingsIcon}/>
    <TinyButton text="Abmelden" background_color="#282828" icon={SignoutIcon} action={signout}/>
  </div>

  <div>
      <button on:click={() => goto("/vorschlagen")}>Vorschlagen</button>
      <button>Meine Vorschläge</button>   
  </div>
</div>

{/if}



