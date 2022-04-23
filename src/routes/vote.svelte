<script>
  import { browser } from '$app/env';
  import Navbar from "../components/nav/navbar.svelte";
  import {currentUser} from "../stores/stores.js"

  
  let user;

  let data = {
    userId: JSON.parse(user)?.id
  }

  let rateInput;
  currentUser.subscribe(val => user = val);

  let submit = undefined;
  let fetchData = undefined;
  $: current_meal = (fetchData) ? fetchData[0] : undefined;



  async function fetchUnvoted() {
    const response = await fetch("http://192.168.0.21:3000/api/unrated.json",{
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      fetchData = data
    })
  }


  function postRate(id) {
        // Send a POST request to src/routes/contact.js endpoint
        submit = fetch("/api/rate.json", {
        method: 'POST',
        body: JSON.stringify({userId: JSON.parse(user).id, mealId: id, value: rateInput}),
        headers: { 'content-type': 'application/json' },
        })
        .then((res) => {
            if (res.ok) {
                return {
                    text:"Bewertung abgegeben."
                }
            }

            return {
                text:"Es gab einen Fehler. Bitte versuche es später erneut."
            }
        })
    }



    function handleClick() {
      // Now set it to the real fetch promise 
      fetchUnvoted();
    }

  $: if(browser) handleClick()

  function handleSkip() {
    const positon = fetchData.indexOf(current_meal);
    const max_position = fetchData.length - 1;
    if (positon < max_position) current_meal = fetchData[positon + 1]
    else current_meal = fetchData[0]
    
  }

  function handleVote() {
    //Buttons locken
    //Input Validieren
    //Value Posten und Antwort abwarten
    //Antwort valideren
    //Bei positiver Antwort: Meal aus Staple löschen & auf nächstes Meal wechsel
    //Bei Error: Fehler anzeigen
  }


</script>



<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #page_container {
      margin: 3rem 0 7rem 0;
  }

  :global(p) {
    font-family: 'Montserrat', sans-serif;
  }
  
  :global(body) {
    margin: 0 1rem;
  }



</style>



<svelte:head>
  <title>WasEssenWirHeute</title>
</svelte:head>

{#if browser}
  <div id="page_container">
    <Navbar active=2/>
    <button on:click={ handleClick }>
      Nachladen
    </button>
    {#if current_meal }

      <p>{current_meal.id}</p>
      <p>{current_meal.title}</p>
      <p>{current_meal.date}</p>
      <input type="number" bind:value={rateInput}/><button>Send</button>

      <br>
      
      <button on:click={handleSkip} disabled={fetchData.length == 1}>Next</button>
      
    {:else}
      Es gibt nichts zum bewerten.
    {/if}
    
    
  </div>

  
{/if}




