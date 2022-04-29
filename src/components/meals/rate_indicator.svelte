<script>
    import GoodRate from "../../assets/icons/ico_rate_good.png"
    import NeutralRate from "../../assets/icons/ico_rate_neutral.png"
    import BadRate from "../../assets/icons/ico_rate_bad.png"


    export let points;

    let icon;
    let color;

    console.log(points);


    switch (points) {
        case (points >=80) && points:
            color = "perfect_rate";
            icon = GoodRate
            break;

        case (points >= 60) && points:
            color = "good_rate";
            icon = GoodRate
            break;
    
        case (points >= 40) && points:
            color = "neutral_rate";
            icon = NeutralRate
            break;
        
        case (points >= 20) && points:
            color = "unsatisfying_rate";
            icon = NeutralRate
            break;

        case (points >= 0) && points:
            color = "bad_rate";
            icon = NeutralRate
            break;

        default:
            color = "novote";
            icon = NeutralRate
            break;
    }


</script>

<style>

    #display_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
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

    .perfect_rate {
        background-color: #FCC219;
    }

    .good_rate {
        background-color: #FCC219;
    }
    .neutral_rate {
        background-color: #FCE399;
    }
    .unsatisfying_rate {
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
        <p class="novote">?</p>
        <span></span>

    {:else}
        <div id="emojie">
            <img src={icon} alt="">
        </div>   
    {/if}
    
</div>