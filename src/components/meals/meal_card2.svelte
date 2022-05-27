<script>
// @ts-nocheck

    import { browser } from '$app/env';
    import { createEventDispatcher, onMount } from 'svelte';
    import { currentUser } from "../../stores/stores.js"


    import RateIndicator from "../meals/rate_indicator.svelte"
    import Slider from '@bulatdashiev/svelte-slider';
    import StyledButton from "../util/button.svelte"

    export let mealData;
    export let state;

    const dispatch = createEventDispatcher()


    let acUser;
    currentUser.subscribe(val => acUser = val);

    let rateInput;
    let changeInput;
    let submit;
    let state_edit_vote = false;

    //MealCardDescRef
    let mealCardDesc;

    function openCard() {
        dispatch('toggle')
    }


    function calcScore() {
        return Math.floor((mealData.rates.map(x => {return x.value}).reduce((a,b) => a + b,0))/mealData.rates.length);
    }

    function checkUserVote() {
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
        return http.status != 404;   
    }


    if(browser) changeInput = checkUserVote()?.value;

    function descOverflown(element) {
        if(!element) return false  
        if (element.clientHeight < element.scrollHeight) return true
        else return false
    }
</script>

<style>



    :root {
        --track-bg: #ebebeb;
        --progress-bg:red;
    }
    
    #meal_card_container {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        border-radius: 0.75rem;
        -webkit-box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px; 
        box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
        border-radius: 0.75rem;

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
        overflow: hidden;
        border-radius: 0.75rem 0.75rem 0 0 ;

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
        overflow:hidden;
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

    #already_voted {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #282828;
        color: white;
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.75rem;
    }

    #vote_component {
        display: flex;
        flex-direction: row;
        margin: 0.75rem;
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

        margin: 0;

    }

    .invisible {
        display: none;
    }

    .tiny {
        font-size: 0.8rem;
    }

    .orange_c {
        color: #FCC219;
    }

    .slider_frame {
        display: flex;
        align-items: center;
        border-radius: 0.75rem;
        margin-right: 0.5rem;
        background-color: #282828;
        padding: 0.5rem;
        height: 2rem;
        width: calc(100vw - 1rem);
    }


</style>

<div id="meal_card_container" >
    <div id="meal_banner" class={(imageExists(`../meal_images/${mealData.id}.jpg`)) ? "has_banner" : "no_banner"} style="--Image:url({`../meal_images/${mealData.id}.jpg`})">
        <div id="rate_indicator_container">
            <RateIndicator points={calcScore()} size={"2.5rem"}></RateIndicator>
        </div>


        <div id=meal_text><p class="meal_info tiny">Hinzugefügt am {new Date(mealData.date).toLocaleDateString()} von {mealData.authorName.split(" ")[0]}</p>
            <p class="meal_title">
                {mealData.title}
            </p>
        </div>
        
    </div>
    <div id="desc_container" bind:this={mealCardDesc}>
        <div id="fffgradient" class={(state) ? "invisible":""}></div>
        {mealData.desc}
    </div>


    {#if descOverflown(mealCardDesc)}
        <div id="text_extender" on:click={openCard}>
            {state ? "Weniger":"Mehr"}
        </div>
    {/if}
    

    {#if checkUserVote()}
        {#if state_edit_vote == false}
            <div id="already_voted" class="tiny"> 
                <div>Bereits bewertet.</div>
                <div class="orange_c" on:click={toggle_edit_mode}>Bearbeiten</div>
            </div>
        {:else}
            <br>Bewertung ändern: <input type="number" bind:value={changeInput}/> 
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
            <div id="vote_component">
                <div class="slider_frame">
                    <Slider bind:value={rateInput}>
                        <span style="font-size: 20px;">❤️</span>
                    </Slider>
                </div>

                <StyledButton call={postRate} >
                    Senden
                </StyledButton>

            
            </div> 
            


        {/if}

    {/if}


</div>