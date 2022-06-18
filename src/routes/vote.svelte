<script>
// @ts-nocheck

  import { browser } from '$app/env';
  import {currentUser} from "../stores/stores.js"

  //Components
  import PageContainer from "../components/util/page_container.svelte"
  import Navbar from "../components/nav/navbar.svelte";
  import MealCard from "../components/meals/meal_card.svelte"
  import SlimButton from "../components/util/slim_button.svelte"
  import Button from "../components/util/button.svelte"



  let value;

  let user;
  currentUser.subscribe(val => user = val);

  let data = {
    userId: (user) ? JSON.parse(user)?.id: null
  }

  let submit = undefined;
  let fetchData = undefined;
  $: current_meal = (fetchData) ? fetchData[0] : undefined;

  
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

    function handleClick() {
      // Now set it to the real fetch promise 
      submit = fetchUnvoted();
    }

  

  function handleSkip() {
    card_open = false;
    const positon = fetchData.indexOf(current_meal);
    const max_position = fetchData.length - 1;
    if (positon < max_position) current_meal = fetchData[positon + 1]
    else current_meal = fetchData[0] 
  }



  let card_open = false;


  function toggle_card() {
    card_open = !card_open
  }

  async function handleVote() {
    submit = fetchUnvoted();
  }


  //On Mount ?
  $: if(browser) handleClick()

</script>



<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  :global(html) {
    background-color: #F8F8F8;
  }
  
  :global(body) {
    margin: 0 1rem;
    font-family: 'Montserrat', sans-serif;

  }


  #mealcard_holder {
    background-color: white;
    min-height: calc(100vh - 12rem);


  }

  .open {
    height: 100%;
  }


  .closed {
    height: calc(100vh - 12rem);
  }

  #skip_button {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 3rem;
  }
  

  .flex_center {
    display: flex;
    height: calc(100vh - 9rem);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    color: #636261;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    opacity: 0.75;
  }

  .secondary {
    color: #636261;
    font-size: 1.2rem;
    font-weight: 400;
    margin: 1rem 1rem 3rem 1rem;
    opacity: 0.75;

  }

  #animation_box {
    display: flex;
    flex-direction: row;
  }


  #animation_box div{
    display: flex;
    height: 1rem;
    width: 1rem;
    margin: 0.5rem;
    background-color: #FCB919;
    border-radius: 0.2rem;
  }


  @keyframes flickerAnimation {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}


  .a1 {
    -webkit-animation: flickerAnimation 1s infinite;
    -moz-animation: flickerAnimation 1s infinite;
    -o-animation: flickerAnimation 1s infinite;
    animation: flickerAnimation 1s infinite;
    animation-delay: 0.1s;
  }

  .a2 {
    -webkit-animation: flickerAnimation 1s infinite;
   -moz-animation: flickerAnimation 1s infinite;
   -o-animation: flickerAnimation 1s infinite;
    animation: flickerAnimation 1s infinite;
    animation-delay: 0.2s;

  }
  
  .a3 {
    -webkit-animation: flickerAnimation 1s infinite;
   -moz-animation: flickerAnimation 1s infinite;
   -o-animation: flickerAnimation 1s infinite;
    animation: flickerAnimation 1s infinite;
    animation-delay: 0.3s;

  }
</style>



<svelte:head>
  <title>WasEssenWirHeute</title>
</svelte:head>

{#if browser}
  
  <PageContainer>
    <Navbar active=2/>
    
    {#await submit}
      <div class="flex_center">
        <div id="animation_box">
          <div class="a1"></div>
          <div class="a2"></div>
          <div class="a3"></div>
        </div>
      </div>
    {:then} 
      {#if current_meal }

        <div id="mealcard_holder" class={(card_open) ? "open" : "closed"}>
          <MealCard mealData={current_meal} on:toggle={toggle_card} state={card_open} on:onVote={handleVote}/>  
        </div>
        
        <div id="skip_button">
          <SlimButton background_color={"white"} text_color={"black"} on:click={handleSkip} disabled={fetchData.length == 1}>Überspringen</SlimButton>
        </div>

      {:else}
        <div class="flex_center">
          <p class="title">Alles bewertet!</p>
          <p class="secondary">Du hast alle verfügbaren Gerichte bewertet!</p>
          <Button>Zurück</Button>
        </div>
      {/if}
    {/await}
  </PageContainer>
{/if}



