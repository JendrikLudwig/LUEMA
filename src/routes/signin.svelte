<script context="module">
    export async function load({fetch}) {
        const res = await fetch("/api/user.json")
        const users = await res.json()

        if (res.ok) {
            return {
                props: {
                    users 
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
    import { currentUser } from '../stores/stores.js';
    // @ts-ignore
    import { goto } from '$app/navigation';

    import Styled_button from "../components/util/button.svelte"
    import Styled_Select from "../components/util/select.svelte"

    let error = new String();
    let acUser;
    let selected_user;
    export let users = [];

    currentUser.subscribe(user => {
        acUser = user
    });

    function assignUser() {
        currentUser.update(() => selected_user)
        
    }

    function signIn() {
        if(!selected_user) {
            error = "Bitte wähle deinen Namen aus!"
            return;    
        } 
        assignUser()
        goto("/");    
    }


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

:global(html) {
    background-color: #F8F8F8;
  }

#page_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 3rem 0;
    min-height: calc(100vh - 6rem);

    font-family: 'Montserrat', sans-serif;
}

#title_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

#selection_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 6rem 0 0 0;
}

#selection_container p {
    font-weight: 600;
    text-align: center;
}

#error {
    margin: 1rem 0 0 0;
    color: #FC1919;
}

#footer {
    display: flex;
    justify-content: center;
    width: 100%;
    opacity: 0.4;
    font-size: 0.6rem;
    margin-bottom: 2rem;
}

.welcome {
    font-weight: 600;
    margin: 0;
    font-size: 1.8rem;
    color: #FCB919;
    text-transform: uppercase;
}

.name {
    font-weight: 600;
    margin: 0;
    font-size: 2.6rem;

}

.detail {
    font-weight: 300;
    margin: 0;
    font-size: 0.7rem;
}

</style>


<svelte:head>
  <title>Anmelden</title>
</svelte:head>

<div id="page_container">
    <div id="body">

        <div id="title_container">
            <p class="welcome">Wilkommen bei</p>
            <p class="name">LUEMA</p>
            <p class="detail">Ludwig's-Essens-Manager</p>
    
        </div>
        <div id="selection_container">
            <p>Bitte wähle deinen Namen aus:</p>
        
            <Styled_Select bind:value={selected_user}>
                {#each users as user}
                <option value={JSON.stringify(user)}>{user.name}</option>
                {/each}
            </Styled_Select>
    
            <Styled_button call={signIn} >
                Anmelden
            </Styled_button>
    
            <div id="error">
                {error}
            </div>
        </div>

    </div>


    <div id="footer">
        <p>Made with 🧠 by Jendrik Ludwig</p>
    </div>
    



</div>

    

    





