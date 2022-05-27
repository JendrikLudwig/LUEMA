export const users = [ 
    {
        id:1, 
        name:"Jendrik Ludwig",
    },
    {
        id:2,
        name:"Joris Ludwig",
    },
    {
        id:3,
        name:"Janus Ludwig",
    },
    {
        id:4,
        name:"Junis Ludwig",
    },
    {
        id:5,
        name:"Alexandra Ludwig",
    },
    {
        id:6,
        name:"Carsten Gerling",
    },
]

export let meals = [ 
    {
        id:1,
        date: new Date(),
        title:"Griechischer Reisauflauf",
        desc:"Reisnudeln mit Gemüse",
        body:"Lorem Ipsum...",
        img:"",
        authorId:1,
    },
    {
        id:2,
        date: new Date(),
        title:"Spinatnudeln",
        desc:"<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>",
        body:"Lorem Ipsum...",
        img:"",
        authorId:3,
    },
    {
        id:3,
        date: new Date(),
        title:"Bratwurst",
        desc:"Erklärt sich von selbst wa?",
        body:"Lorem Ipsum...",
        img:"",
        authorId:2,
    },
    {
        id:4,
        date: new Date(),
        title:"Kotlette mit Pilzen",
        desc:"Ist halt das was da steht... Volkommen klar",
        body:"Lorem Ipsum...",
        img:"",
        authorId:1,
    },
]

export let ratings = [
    {userId:1, mealId:1, value:100},
    {userId:2, mealId:1, value:50},
    {userId:4, mealId:1, value:32},
    {userId:4, mealId:2, value:100},
]
