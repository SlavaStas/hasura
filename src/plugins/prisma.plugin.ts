import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

const prismaPlugin = fp(async (app: FastifyInstance) => {
  const prisma = new PrismaClient();

  app.decorate('prisma', prisma);

  await prisma.$connect();

  app.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  })
})

export default prismaPlugin;
