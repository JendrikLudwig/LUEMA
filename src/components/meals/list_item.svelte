<script>
    import PointsDisplay from "./points_display.svelte";

    import ArrowRight from "../../assets/icons/ico_arr_right.png"

    export let id;
    export let title = null;
    export let desc = null;
    export let rates = [];


</script>

<style>

    #card_container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: calc(100%-1rem);
        height: 7rem;
        padding: 0.5rem;
        border-radius: 0.75rem;
        -webkit-box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin: 0 0 1rem 0;
    }

    #front_part {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    #back_part {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        min-width: 5.5rem;
        height: 100%;
        margin-left: 0.2rem;
    }

    #title {
        font-size: 1rem;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2; 
        -webkit-box-orient: vertical;

    }

    #desc {
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2; 
        -webkit-box-orient: vertical;


    }

    #votedby {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1.5rem;
    }

    #votedby img {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.25rem;
        border-radius: 100%;
    }
    

    #more {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1.5rem;
    }

    #more img {
        width: 0.5rem;
        padding: 0.25rem;
    }

    #more p {
        font-size: 0.8rem;
        padding: 0.25rem;

    }

    a, a:link {
        color: black;
        text-decoration: none;
        
    }

</style>

<a href="/meals/{id}">

    <div id="card_container">
        <div id="front_part">
            <div id="title">{title}</div>
            <div id="desc">{desc}</div>
            <div id="votedby">
                {#each rates as rate}
                    <img src={"/user_images/"+rate.id+".jpg"} alt="">
                {/each}
    
            </div>
        </div>
        <div id="back_part">
            <PointsDisplay points={Math.floor(rates.map(x => {return x.value}).reduce((a,b) => a + b,0)/rates.length)}></PointsDisplay>
            <div id="more">
                <p>Mehr</p>
                <img src={ArrowRight} alt="">
            </div>
        </div>
    </div>



</a>