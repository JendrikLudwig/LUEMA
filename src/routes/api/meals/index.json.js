import { meals, ratings, users} from "../data";



export const get = () => {
    const meal_data = meals.map(meal =>{
        const rates = ratings.filter(x => x.mealId == meal.id)
        // @ts-ignore
        const totalPoints = rates.map(x => {return x.value}).reduce((a,b) => a + b,0);

        const user_votes = rates.map(vote => {
            const user = users.find(u => vote.userId == u.id);

            return {
                ...user,
                value: vote.value
            }

        })
 

        return {
            ...meal,
            rating_score: totalPoints/rates.length,
            rates: user_votes
        }
        
    })
    return {
        body: meal_data,
    };
};

export const post = async ({request}) => {
    const data = await request.json();
    console.log(data);


    const newData = {
        id: (meals.length-1 == 0) ? 0 : meals[meals.length-1].id + 1,
        title: data?.name,
        desc: data?.desc,
        authorId: data?.user?.id
    }

    meals.push(newData);
  
    return { body: {text: "Dein Gericht wurder erfolgreich hinzugefügt!"} }
}