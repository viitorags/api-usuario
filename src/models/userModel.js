import db from '../config/db.js';

class UserModel {
    async getUser(user_id) {
        try {
            const query = 'SELECT * FROM users WHERE user_id = ?';
            const rows = await db.query(query, [user_id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async createUser(user_name, user_email, user_password) {
        try {
            const query =
                'INSERT INTO users (user_name, user_email, user_password) VALUES ( ?, ?, ? )';
            const result = await db.query(query, [
                user_name,
                user_email,
                user_password,
            ]);
            return { user_id: result.insertId };
        } catch (error) {
            throw error;
        }
    }

    async updateUser(user_name, user_email, user_password, user_id) {
        try {
            const query =
                'UPDATE users SET user_name = ?, user_email = ?, user_password = ? WHERE user_id = ?';
            const result = await db.query(query, [
                user_name,
                user_email,
                user_password,
                user_id,
            ]);
            return { affectedRows: result.affectedRows };
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(user_id) {
        try {
            const query = 'DELETE FROM users WHERE user_id = ?';
            const result = await db.query(query, [user_id]);
            return { affectedRows: result.affectedRows };
        } catch (error) {
            throw error;
        }
    }
}

export default UserModel;
