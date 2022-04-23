import { users } from "./data";

export const get = () => {
    return {
        body: users,
    };
};