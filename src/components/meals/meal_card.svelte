<script>
    import { browser } from '$app/env';
    import { currentUser } from "../../stores/stores.js"

    import Card from "../util/card.svelte"

    export let mealData;

    let acUser;
    currentUser.subscribe(val => acUser = val);

    let rateInput;
    let changeInput;
    let submit;
    let state_edit_vote = false;

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

    if(browser) changeInput = checkUserVote()?.value;

</script>

<style>

</style>

<div id="meal_card_container">
    <Card>
        
        <p>Gericht vorgeschlagen von: {mealData.authorName}</p>
        <h1>
            Name: {mealData.title}
        </h1>
        <p>Beschreibung: {mealData.desc}</p>
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

    </Card>
</div>