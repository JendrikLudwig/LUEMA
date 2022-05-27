<script context="module">
    export async function load({params, fetch}) {
        const res = await fetch(`/api/meals/${params.id}.json`)
        const mealData = await res.json()

        if (res.ok) {
            return {
                props: {
                    mealData 
                }
            }
        }
        
    }

</script>

<script>
    import { browser } from '$app/env';
    import { currentUser } from "../../stores/stores.js"

    //Components
    import Navbar from '../../components/nav/navbar.svelte';
    import MealCard2 from "../../components/meals/meal_card2.svelte"
    import PageContainer from "../../components/util/page_container.svelte"

    export let mealData;
    console.log(mealData);
    let acUser;

    let card_open = false;

    currentUser.subscribe(val => acUser = val);

    function toggle_card() {
      card_open = !card_open
    }
    
    


</script>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
   
    
    :global(body) {
        font-family: 'Montserrat', sans-serif;
        margin: 0 1rem;
    }
  

    #mealcard_holder {
      background-color: white;
      min-height: calc(100vh - 9rem);


    }

    .open {
      height: 100%;
    }


    .closed {
      height: calc(100vh - 9rem);
    }
  
  
  </style>


<svelte:head>
  <title>WasEssenWirHeute</title>
</svelte:head>

{#if browser}

<PageContainer>
  <Navbar active=0/>
  <div id="mealcard_holder" class={(card_open) ? "open" : "closed"}>
    <MealCard2 mealData={mealData} on:toggle={toggle_card} state={card_open}/>  
  </div>
</PageContainer>

{/if}
