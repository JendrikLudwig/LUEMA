import { meals, ratings, users } from "../data";

export const get = ({params}) => {
    const meal = meals.find((val) => params.id == val.id )
    const rates = ratings.filter((val) => params.id == val.mealId)

    return {
        body: {
            ...meal,
            authorName: users.filter(user => user.id == meal.authorId)[0].name,
            rates
        },
    };
};