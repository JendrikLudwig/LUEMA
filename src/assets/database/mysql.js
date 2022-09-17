import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({ 
    host: 'localhost',
    port:'3306',
    user: 'luema_backend',
    password: 'BVUwvphzt7Y4s9zufm2h@e!TdWTWzNrXg25vZusDv?gtX&578zME#ABS#4qnBMv$',
    database: 'luema'
});
