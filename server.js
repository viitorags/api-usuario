import fastify from 'fastify';
import routes from './src/routes/routes.js';

const app = fastify({ logger: true });

app.register(routes);

app.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`${address}`);
});
