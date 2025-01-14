import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Role } from '@prisma/client';
import { hashPassword } from '../utils/auth';

export default async function registerRoute(server: FastifyInstance) {
  server.post<{
    Body: {
      email: string;
      password: string;
      role: Role;
    }
  }>('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password, role } = request.body as {
      email: string;
      password: string;
      role: Role;
    };

    const existingUser = await server.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.status(401).send({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    try {
      const newUser = await server.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });

      return reply.status(200).send({
        user: {
          id: newUser.id,
          email,
          role,
        }, message: 'User created successfully!',
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
}

export { registerRoute };
