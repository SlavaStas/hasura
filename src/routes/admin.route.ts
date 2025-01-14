import { FastifyInstance } from 'fastify';
import { authorize } from '../utils/auth';
import { Role } from '@prisma/client';

export default async function adminRoute(server: FastifyInstance) {
  server.get('/admin', { preHandler: server.authenticate }, async (request, reply) => {
    // console.log('REQUEST: ', request);
    try {
      authorize(request, Role.ADMIN);

      return { message: 'Welcome, Admin!' };
    } catch (err) {
      return reply.status(403).send({ message: 'Forbidden: Insufficient permissions' });
    }
  });
}