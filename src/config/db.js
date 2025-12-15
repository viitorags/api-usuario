import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    async query(sql, params = []) {
        try {
            const [rows] = await this.pool.execute(sql, params);
            return rows;
        } catch (error) {
            console.error('DB ERROR:', error);
            throw error;
        }
    }
}

const db = new Database({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

async function initTable() {
    try {
        await db.query(`
			CREATE TABLE IF NOT EXISTS users (
      			user_id INT AUTO_INCREMENT PRIMARY KEY,
      			user_name VARCHAR(255) NOT NULL,
     		 	user_email VARCHAR(255) UNIQUE NOT NULL,
				user_password VARCHAR(255) NOT NULL
    		)`);
        console.log('Tabela users criada ou já existia');
    } catch (err) {
        console.error('Erro ao criar tabela:', err);
    }
}

await initTable();

export default db;
