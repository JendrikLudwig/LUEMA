<script>
    export let text = null
    export let text_color = "#FFFFFF";
    export let background_color = "#FCB919";
    export let icon ="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
    export let action = function(){ alert("No function defined!") };


</script>

<style>
    #button_container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 2.35rem;
        border-radius: 0.75rem;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 0.4rem;
        margin: 0 0.25rem;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

    #button_container:active {
        transform: scale(0.95);
        filter: brightness(0.9);
    }

    #icon {
        height: 1.5rem;
        margin-right: 0.3rem;
    }

    .button_text {
        font-size: 0.7rem;
        font-weight: bold;


    }
</style>

<div id="button_container" style="background-color: {background_color}; color: {text_color}" on:click={action}>
    <img id="icon" src={icon} alt="icon"/>
    <p class="button_text">{text}</p>
</div>