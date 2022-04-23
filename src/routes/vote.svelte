<script>
// @ts-nocheck

  import { browser } from '$app/env';
  import Navbar from "../components/nav/navbar.svelte";
  import Slider from '@bulatdashiev/svelte-slider';
  import {currentUser} from "../stores/stores.js"

  let value;

  let user;
  currentUser.subscribe(val => user = val);

  let data = {
    userId: (user) ? JSON.parse(user)?.id: null
  }

  let submit = undefined;
  let fetchData = undefined;
  $: current_meal = (fetchData) ? fetchData[0] : undefined;

  let rateInput;


  async function fetchUnvoted() {
    const response = await fetch("api/unrated.json",{
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      fetchData = data
    })
  }

  function postRate(id, value) {
        // Send a POST request to src/routes/contact.js endpoint
        return fetch("/api/rate.json", {
        method: 'POST',
        body: JSON.stringify({userId: JSON.parse(user).id, mealId: id, value: value}),
        headers: { 'content-type': 'application/json' },
        })
        .then((res) => {
            if (res.ok) {
                return {
                    text:"Bewertung abgegeben.",
                    success: true
                }
            }

            return {
                text:"Es gab einen Fehler. Bitte versuche es später erneut.",
                success: false
            }
        })
    }



    function handleClick() {
      // Now set it to the real fetch promise 
      submit = fetchUnvoted();
    }

  

  function handleSkip() {
    const positon = fetchData.indexOf(current_meal);
    const max_position = fetchData.length - 1;
    if (positon < max_position) current_meal = fetchData[positon + 1]
    else current_meal = fetchData[0]
    
  }

  async function handleVote() {
    const ID = current_meal.id;
    const VALUE = rateInput[0];
    //Buttons locken
    //Input Validieren
    //Value Posten und Antwort abwarten
    const RESPONSE = await postRate(ID, VALUE)
    if(RESPONSE.success) {
      submit = fetchUnvoted();
    } else {

    }

    console.log(RESPONSE);
    //Antwort valideren
    //Bei positiver Antwort: Meal aus Staple löschen & auf nächstes Meal wechsel
    //Bei Error: Fehler anzeigen
  }


  //On Mount ?
  $: if(browser) handleClick()

</script>



<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  :root {
  --track-bg: black;
  --progress-bg: #8abdff;
  --thumb-bg: #5784fd;
}

  #page_container {
      margin: 3rem 0 7rem 0;
  }

  :global(p) {
    font-family: 'Montserrat', sans-serif;
  }
  
  :global(body) {
    margin: 0 1rem;
  }


  #test {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 0.85rem;
    width: 10rem;
    background-color: aqua;
    height: 2rem;
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


    {#await submit}
      lädt...
    {:then} 
      {#if current_meal }

        <p>{current_meal.id}</p>
        <p>{current_meal.title}</p>
        <p>{current_meal.date}</p>
        
        <div id="test">
          <Slider bind:value={rateInput}>
            <span style="font-size: 20px;">❤️</span>
          </Slider>
        </div>
        
        <button on:click={handleVote}>Send</button>

        <br>
        <br>
        <br>
        <br>
        
        <button on:click={handleSkip} disabled={fetchData.length == 1}>Next</button>

        
        
        
      {:else}
        Es gibt nichts zum bewerten.
      {/if}
    {/await}
  </div>
{/if}



