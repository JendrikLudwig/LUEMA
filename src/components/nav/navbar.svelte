<script>
    import HomeIcon from "../../assets/icons/ico_home.png"
    import SearchIcon from "../../assets/icons/ico_search.png"
    import VoteIcon from "../../assets/icons/ico_vote.png"

    export let active;

</script>

<style>

    #navbar_container {
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        bottom: 0;
        flex-direction: row;
        width: calc(100vw - 6rem);
        height: 3rem;
        border-radius: 0.75rem;
        background-color: #282828;
        margin:  0 0 1rem 0 ;
        padding: 1rem 2rem;
        pointer-events: all;
    }

    #field_home {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 1.25rem;
        height: 3.5rem;
        width: 3.5rem;

    }

    .nav_element {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        
    }

    .nav_element p {
        font-size: 0.6rem;
        margin: 0.5rem 0 0 0;
        text-decoration: none;
    }
    
    a {
        text-decoration: none;
    }

    .nav_icon {
        width: 1.5rem;
    }

    .active {
        color: #FCB919;
    }

</style>

<div id="navbar_container">
    <!-- ID 0 -->
    <a href="/meals">
        <div id="field_search" class="nav_element">
            <img src={SearchIcon} class="nav_icon" alt="">
            <p class={(active == 0) ? "active" : ""}>Stöbern</p>
        </div>
    </a>
    
    <a href="/">
        <!-- ID 1 -->
        <div id="field_home" class="nav_element">
            <img src={HomeIcon} class="nav_icon" alt="">
        </div>        
    </a>
    
    <a href="/vote">
        <!-- ID 2 -->
        <div id="field_vote" class="nav_element">
            <img src={VoteIcon} class="nav_icon" alt="">
            <p class={(active == 2) ? "active" : ""}>Bewerten</p>
        </div>
    </a>
</div>
