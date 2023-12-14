import mysql from 'mysql2/promise';

let pool = null;
console.log(process.env.DB_HOST);
/**
 * @returns {mysql.Pool}
 */
export default function getConnectionPool() {
    if (pool == null)
        pool = mysql.createPool({
            host: process.env.DB_HOST || '129.146.68.51',
            port: Number.parseInt(process.env.DB_PORT || '3306'),
            database: process.env.DB_NAME || 'system',
            user: process.env.DB_USER || 'system002',
            password: process.env.DB_PWD || 'wordpass123',
            connectionLimit: process.env.DB_POOL_LIMIT || 20,
            waitForConnections: true,
            enableKeepAlive: true,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            keepAliveInitialDelay: 0
        });
    return pool;
}
