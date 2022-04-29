<script>

    export let height = "auto";

</script>

<style>

    #cardcontainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
        border-radius: 0.75rem;
        background-color: white;
        -webkit-box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px; 
        box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
        overflow: hidden;
        
    }

</style>

<div id="cardcontainer" style="height: {height};">
    <slot>

    </slot>
</div>