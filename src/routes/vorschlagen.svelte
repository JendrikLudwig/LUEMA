<script>
    import { goto } from '$app/navigation';
    import { currentUser } from '../stores/stores.js';


    let submit;
    let name = "";
    let desc = "";
    let user;

    currentUser.subscribe(val => {user = val});


    function handleSubmit() {

        // Send a POST request to src/routes/contact.js endpoint
        submit = fetch("/api/meals.json", {
        method: 'POST',
        body: JSON.stringify({name, desc, user: JSON.parse(user)}),
        headers: { 'content-type': 'application/json' },
        })
        .then((res) => {
            if (res.ok) {
                goto("/")
            }
        })
    }

</script>

{#if submit}
  {#await submit}
    <p>Sending...</p>
  {:then res}
    <pre>{JSON.stringify(res?.text, null, 2)}</pre>
  {/await}
{/if}


<form>
    <input type="text" name="titel" bind:value={name}>
    <textarea name="desc" cols="30" rows="10" bind:value={desc}/>
    <input type="button" value="Vorschlagen" on:click={handleSubmit}>
</form>