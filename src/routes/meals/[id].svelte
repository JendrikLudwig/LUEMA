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
    import MealCard from "../../components/meals/meal_card.svelte"

    export let mealData;
    console.log(mealData);
    let acUser;


    currentUser.subscribe(val => acUser = val);
    
    


</script>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
  
    #page_container {
      margin: 3rem 0 7rem 0;
    }
  
    
    :global(body) {
        font-family: 'Montserrat', sans-serif;
        margin: 0 1rem;
    }
  

  
  
  </style>


<svelte:head>
  <title>WasEssenWirHeute</title>
</svelte:head>

{#if browser}

<div id="page_container">
  <Navbar active=0/>
  <MealCard mealData={mealData}/>  
</div>

{/if}
