<script>
    export let background_color = "#282828"
    export let text_color = "#FFFFFF"
    export let value;

</script>
<style>
    .select_container {
        position: relative;
        margin: 1rem 0;
        
    }

    .select_container select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        width: 18rem;
        height: 3rem;
        padding: 1rem 1rem;

        border-radius: 0.75rem;
        border: none;

        font-weight: 300;
        font-family: 'Montserrat';

        -webkit-box-shadow: -1px 4px 10px 5px rgba(0,0,0,0.05); 
        box-shadow: -1px 4px 10px 5px rgba(0,0,0,0.05);
    }


    .select_container:after {
        content: 'Hallo';
    }


    select::-ms-expand {
        display: none;
    }

    .select_container:after {
        display: flex;
        align-items: center;
        content: '\f078';
        font: normal normal normal 17px/1 FontAwesome;
        color: white;
        right: 11px;
        top: 0px;
        height: 100%;
        position: absolute;
        pointer-events: none;
    }

</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<div class="select_container">
    <select bind:value={value} style={`background-color:${background_color};color:${text_color}`}>
        <option value={null} selected disabled hidden>Bitte wählen...</option>
    
        <slot>
            <option>Keine Auswahl vorhanden...</option>
        </slot>    
    </select>
</div>


