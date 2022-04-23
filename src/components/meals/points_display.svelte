<script>
    import GoodRate from "../../../static/icons/ico_rate_good.png"
    import NeutralRate from "../../../static/icons/ico_rate_neutral.png"
    import BadRate from "../../../static/icons/ico_rate_bad.png"


    export let points;

    let icon;
    let color;

    if( points >= 70) {
        color = "good_rate";
        icon = GoodRate

    } else if(points >= 35) {
        color = "neutral_rate"; 
        icon = NeutralRate

    } else {
        color = "bad_rate"; 
        icon = BadRate

    }
    

</script>

<style>

    #display_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 4.5rem;
        height: 1.5rem;
        border-radius: 0.75rem;
        padding: 0.5rem;
    }

    #emojie {
        height: 1.25rem;
        margin: 0;
    }

    #emojie img {
        height: 1.25rem;
    }

    #points {
        font-size: 1.25rem;
    }

    .good_rate {
        background-color: #FCC219;
    }
    .neutral_rate {
        background-color: #FCE399;
    }
    .bad_rate {
        background-color: #E6E6E6;

    }

    .novote {
        font-size: .7rem;
    }


</style>

<div id="display_container" class={color}>
    {#if isNaN(points)}
        <span></span>
        <p class="novote">Unbewertet</p>
        <span></span>

    {:else}
        <div id="emojie">
            <img src={icon} alt="">
        </div>
        <div id="points">
            {points}
        </div>    
    {/if}
    
</div>