<script>
    //Functions
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";

    //Stores
    import { currentUser } from '../stores/stores.js';

    //Components
    import Card from "../components/util/card.svelte"

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

  // Quill Editor:
  let editor;
	
	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "link"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"]
	];
	
  onMount(async () => {
    //https://svelte.dev/repl/e2bbe94abb19419892442729752ee308?version=3.19.1
		const { default: Quill } = await import("quill");
	
    let quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "snow",
      placeholder: "Write your story..."
    });
  });


</script>

<style>
  @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

  :global(html) {
    background-color: #F8F8F8;
  }
  
</style>

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

<div id="text_editor">
  <div bind:this={editor} />
</div>