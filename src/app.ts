import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import prismaPlugin from './plugins/prisma.plugin';
import jwtPlugin from './plugins/jwt.plugin';
import healthRoute from './routes/health';
import registerRoute from './routes/register.route';
import loginRoute from './routes/login.route';
import adminRoute from './routes/admin.route';

const buildServer = async () => {
  const server = Fastify({ logger: true });

  // Plugins
  await server.register(helmet);
  await server.register(cors, { origin: '*' });
  await server.register(prismaPlugin);
  await server.register(jwtPlugin);

  // Routes
  await server.register(healthRoute, { prefix: '/api' });
  await server.register(registerRoute, { prefix: '/api' });
  await server.register(loginRoute, { prefix: '/api' });
  await server.register(adminRoute, { prefix: '/api' });

  return server;
};

const startServer = async () => {
  const server = await buildServer();

  try {
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || 'localhost';

    await server.listen({
      port: Number(PORT),
      host: HOST,
    });

    console.log(`Listening on url ${HOST}:${PORT}...`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
