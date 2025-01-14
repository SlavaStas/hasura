import { FastifyInstance } from 'fastify';
import { generateJWT, verifyPassword } from '../utils/auth';

export default async function loginRoute(server: FastifyInstance) {
  server.post<{
    Body: {
      email: string;
      password: string;
    }
  }>('/login', async (request, reply) => {
    const { email, password } = request.body;

    const user = await server.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return reply.status(401).send({ message: 'Invalid password' });
    }

    const token = generateJWT(user.id, user.role);
    return { token };
  });
}