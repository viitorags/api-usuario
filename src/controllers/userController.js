import UserModel from '../models/userModel.js';
import argon2 from 'argon2';

const userModel = new UserModel();

class UserController {
    async getUser(user_id, reply) {
        try {
            const user = await userModel.getUser(user_id);
            if (!user)
                return reply
                    .code(404)
                    .send({ message: 'Usuário não encontrado' });
            return reply.code(200).send({
                message: 'Usuário encontrado',
                data: {
                    user: {
                        user_id: user.user_id,
                        user_name: user.user_name,
                        user_email: user.user_email,
                    },
                },
            });
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    }

    async createUser(data, reply) {
        try {
            const hashPass = await argon2.hash(data.user_password);
            const user = await userModel.createUser(
                data.user_name,
                data.user_email,
                hashPass
            );
            if (!user)
                return reply
                    .code(404)
                    .send({ message: 'Não foi possivel criar usuário' });
            return {
                status: 201,
                message: 'Usuário criado com sucesso',
                data: {
                    user: user.user_id,
                },
            };
        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }

    async updateUser(user_id, data, reply) {
        try {
            const hashPass = await argon2.hash(data.user_password);
            const user = await userModel.updateUser(
                data.user_name,
                data.user_email,
                hashPass,
                user_id
            );
            if (!user)
                return reply
                    .code(404)
                    .send({ message: 'Não foi possivel atualizar usuário' });
            return reply.code(201).send({
                message: 'Usuário atualizado com sucesso',
                data: {
                    user: user.user_id,
                },
            });
        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }

    async deleteUser(user_id, reply) {
        try {
            const user = await userModel.deleteUser(user_id);
            if (!user)
                return reply
                    .code(404)
                    .send({ message: 'Não foi possivel deletar usuário' });
            return reply.code(201).send({
                message: 'Usuário deletado com sucesso',
                data: {
                    user: user.user_id,
                },
            });
        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }
}

export default UserController;
