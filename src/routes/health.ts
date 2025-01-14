import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const healthRoute = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.get('/health', (request, reply) => {
    return { status: 200 };
  });
};

export default healthRoute;