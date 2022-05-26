<script>
    import { browser } from '$app/env';
    import { createEventDispatcher } from 'svelte';
    import { currentUser } from "../../stores/stores.js"

    import RateIndicator from "../meals/rate_indicator.svelte"

    export let mealData;
    export let state;

    const dispatch = createEventDispatcher()


    let acUser;
    currentUser.subscribe(val => acUser = val);

    let rateInput;
    let changeInput;
    let submit;
    let state_edit_vote = false;



    function openCard() {
        dispatch('toggle')
    }


    function calcScore() {
        return Math.floor((mealData.rates.map(x => {return x.value}).reduce((a,b) => a + b,0))/mealData.rates.length);
    }

    function checkUserVote() {
        console.log(mealData);
        const voted = mealData.rates.filter( x => x.userId == JSON.parse(acUser).id);
        return voted?.[0];
    }

    function postRate() {
        // Send a POST request to src/routes/contact.js endpoint
        submit = fetch("/api/rate.json", {
        method: 'POST',
        body: JSON.stringify({userId: JSON.parse(acUser).id, mealId: mealData.id, value: rateInput}),
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

    function changeRate() {
        // Send a POST request to src/routes/contact.js endpoint
        submit = fetch("/api/rate.json", {
        method: 'PUT',
        body: JSON.stringify({userId: JSON.parse(acUser).id, mealId: mealData.id, value: changeInput}),
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

    function toggle_edit_mode() {state_edit_vote = !state_edit_vote};


    function imageExists(url) {
        let http = new XMLHttpRequest();
        http.open("Head",url,false);
        http.send()
        console.log(http.status != 404);
        return http.status != 404;
        
    }

    if(browser) changeInput = checkUserVote()?.value;

</script>

<style>
    
    #meal_card_container {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        border-radius: 0.75rem;
        background-color: white;
        -webkit-box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px; 
        box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
        overflow: hidden;
    }



    #meal_banner {
        display: flex;
        width: calc(100%-1rem);
        background-color: #282828;
        background-position: center;
        background-size: cover;
        background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)), var(--Image);/* W3C */
        flex-direction: column;  
        padding: 0.5rem;  
    }
    

    #rate_indicator_container {
        display: flex;
        justify-content: flex-end;
        width: 4.5rem;
        height: 4.5rem;
    }


    #meal_text {
        height: auto;
        margin: 0 0 0.5rem 0;

    }

    #meal_text::after {
        content: "";
        font-size: 0;
        display: flex;
        background-color: #FCC219;
        margin: 0.4rem 0 0 0;
        width: 3rem;
        height: 0.1rem;


    }

    #desc_container {
        display: flex;
        position: relative;
        flex-direction: column;
        margin: 1rem 0;
        height: 100%;
        overflow: hidden;
        padding: 0.5rem 0.5rem 0 0.5rem;
    }
    
    #fffgradient {
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,0));
        width: 100%;
        height: 50%;
        z-index: 2;
    }

    #text_extender {
        display: flex;
        justify-content: center;
        height: 3rem;
        margin: -0.5rem 0 0.5rem 0;
        z-index: 3;
    }

    .no_banner {
        min-height: 10rem;
        height: 20vh;
    }

    .has_banner {
        min-height: 15rem;
        height: 20vh;


    }

    .meal_title {
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
        margin: 0;

    }

    .meal_info {
        color: white;
        font-size: 0.8rem;
        margin: 0;

    }

    .invisible {
        display: none;
    }


</style>

<div id="meal_card_container" >
    <div id="meal_banner" class={(imageExists(`../meal_images/${mealData.id}.jpg`)) ? "has_banner" : "no_banner"} style="--Image:url({`../meal_images/${mealData.id}.jpg`})">
        <div id="rate_indicator_container">
            <RateIndicator points={calcScore()} size={"2.5rem"}></RateIndicator>
        </div>


        <div id=meal_text><p class="meal_info">Hinzugefügt am {new Date(mealData.date).toLocaleDateString()} von {mealData.authorName.split(" ")[0]}</p>
            <p class="meal_title">
                {mealData.title}
            </p>
        </div>
        
    </div>
    <div id="desc_container">
        <div id="fffgradient" class={(state) ? "invisible":""}></div>
        {mealData.desc}
    </div>
    <div id="text_extender" on:click={openCard}>
        {state ? "Weniger":"Mehr"}
    </div>

    {#if mealData.rates.length != 0}
        Score: {calcScore()}
    {:else}
        Noch keine Bewertung vorhanden
    {/if}
    {#if checkUserVote()}
        {#if state_edit_vote == false}
            <br>Du hast bereits bewertet : <span on:click={toggle_edit_mode}>Bearbeiten</span>
        {:else}
            <br> Bewertung ändern: <input type="number" bind:value={changeInput}/> 
            <button on:click={changeRate}>Senden</button> 
            <span on:click={toggle_edit_mode}>Abbrechen</span>
        {/if}
        
    {:else}

        {#if submit}
            {#await submit}
                <p>O</p>
            {:then res}
                <pre>{JSON.stringify(res.text, null, 2)}</pre>
            {/await}

        {:else}
            <br> Bewerten: <input type="number" max="100" bind:value={rateInput}>
            <button on:click={postRate}>Senden</button>
        {/if}

    {/if}


</div>