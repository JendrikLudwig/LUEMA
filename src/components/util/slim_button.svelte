<script>
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher()

    export let background_color = "#FCB919"
    export let text_color = "#FFFFFF"
    export let disabled = false;

    function click() {
        dispatch("click")
    }

</script>
<style>
    .button_container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        border-radius: 0.75rem;
        width: 18rem;
        border: none;
        font-family: 'Montserrat';
        transition-duration: 0.05s;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        -webkit-box-shadow: -1px 4px 10px 5px rgba(0,0,0,0.05); 
        box-shadow: -1px 4px 10px 5px rgba(0,0,0,0.05);
    }

    .button_container:active {
        transform: scale(0.95);
        filter: brightness(0.9);
    }


</style>


<button class="button_container" on:click={click} style={`background-color:${(disabled) ? "white" : background_color}`} disabled={disabled}>
    <p style={`color:${disabled ? "#D8D8D8" : text_color}`}>
        <slot>
            <em>Click</em>
        </slot>
    </p>
    
</button>

