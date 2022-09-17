import { mysqlconn } from '../../assets/database/mysql';



export const get = async () => {
    const query = `

            SELECT * FROM user_select
            
        `

    let results = await mysqlconn.query(query)
    .then(function([rows]) {
        return rows;
    });

    return {
        body: results,
    };
};