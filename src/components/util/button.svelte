<script>
    export let call = function(params) { console.error("Keine Funktion definiert")};
    export let background_color = "#FCB919"
    export let text_color = "#FFFFFF"

</script>
<style>
    .button_container {
        height: 3rem;
        border-radius: 0.75rem;
        width: 18rem;
        border: none;
        font-weight: bold;
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


<button class="button_container" on:click={call} style={`background-color:${background_color}`}>
    <p style={`color:${text_color}`}>
        <slot>
            <em>Click</em>
        </slot>
    </p>
    
</button>

