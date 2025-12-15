import UserController from '../controllers/userController.js';

const controller = new UserController();

async function routes(fastify) {
    fastify.get('/api/user/:id', async (req, reply) => {
        return controller.getUser(req.params.id, reply);
    });

    fastify.post('/api/user', async (req, reply) => {
        return controller.createUser(req.body, reply);
    });

    fastify.put('/api/user/:id', async (req, reply) => {
        const id = req.params.id;
        const data = req.body;
        return controller.updateUser(id, data, reply);
    });

    fastify.delete('/api/user/:id', async (req, reply) => {
        return controller.deleteUser(req.params.id, reply);
    });
}

export default routes;
