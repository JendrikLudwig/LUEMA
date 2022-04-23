import { ratings} from "./data";





export const post = async ({request}) => {
    const data = await request.json();
    let {userId, mealId, value} = data
    console.log(data);

    if (!userId || !mealId || !value) throw new Error("Fehlender Parameter")

    const old_rate_index = ratings.findIndex(x => x.userId == userId && x.mealId == mealId);
    if(old_rate_index != -1) throw new Error("Dieses Gericht wurde bereits bewertet.")


    const new_rating = {
        userId: userId,
        mealId: mealId,
        value: value
    }

    ratings.push(new_rating);
  
    return { body: {text: "Gericht erfolgreich bewertet."} }
}

export const put = async ({request}) => {
    const data = await request.json();
    let {userId, mealId, value} = data
    console.log(data);
    if (!userId || !mealId || !value) throw new Error("Fehlender Parameter")

    const new_rating = {
        userId: userId,
        mealId: mealId,
        value: value
    }

    const old_rate_index = ratings.findIndex(x => x.userId == userId && x.mealId == mealId);
    if(old_rate_index == -1) throw new Error("Bewertung wurde nicht gefunden")

    ratings[old_rate_index] = new_rating
  
    return { body: {text: "Bewertung aktualisiert."} }
    
    
}