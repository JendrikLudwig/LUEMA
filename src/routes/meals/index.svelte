<script context="module">
    export async function load({fetch}) {
        const res = await fetch("/api/meals.json")
        const meals = await res.json()

        if (res.ok) {
            return {
                props: {
                    meals 
                }
            }
        }


        return {
            status: res.status,
            error: new Error("Nutzer konnten nicht geladen werden.")
        }  
    }
</script>


<script>
    import { goto } from '$app/navigation';
    import { browser } from '$app/env';
    import ListItem from '../../components/meals/list_item.svelte';
    import Navbar from '../../components/nav/navbar.svelte';
    import PageContainer from "../../components/util/page_container.svelte"

    export let meals;
    console.log(meals);

</script>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
  


    
    :global(body) {
      margin: 0 1rem;
      font-family: 'Montserrat', sans-serif;

    }
  

  
  
  </style>


<svelte:head>
  <title>WasEssenWirHeute</title>
</svelte:head>

{#if browser}


<PageContainer>
    <Navbar active=0/>

    {#each meals as meal}

        <!-- Filter goes here-->
        <ListItem
            id = {meal.id}
            title = {meal?.title}
            desc = {meal?.desc} 
            rates = {meal?.rates}
        ></ListItem>
    {/each}

    <button on:click={() => goto("/")}>Zurück</button>

</PageContainer>

{/if}




