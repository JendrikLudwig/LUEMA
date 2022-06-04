import { ratings, meals, users} from "./data";

export const post = async ({request}) => {
    const data = await request.json();
    let { userId } = data
    console.log(data);

    const ratedIds = ratings.filter(x => x.userId === userId).map(y => {return y.mealId})
    const unrated = meals.filter(y => !ratedIds.includes(y.id))

    const response = unrated.map(meal => {
        const rates = ratings.filter(x => x.mealId == meal.id)
        return {
            ...meal,
            rates,
            authorName: users.find(u => u.id === meal.authorId).name,
            

        }
    })
    
    return {body: response}

}