<script>
    export let username = null;
    export let id;

</script>

<style>
    #header_container {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 3rem 0 2rem 0;
    }

    #profile_image {
        width: 5rem;
        height: 5rem;
        border-radius: 0.75rem;

    }
    #text_container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 0 0 1rem;
    }

    .welcome {
        color: #FCB919;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    .username {
        font-size: 1.2rem;
        font-weight: 400;
        margin: 0;

    }

</style>


<div id="header_container">
    <img id="profile_image" src={`/user_images/${id}.jpg`} alt=""/>
    <div id="text_container">
        <p class="welcome">WILKOMMEN</p>
        <p class="username">{username}</p>
    </div>
</div>