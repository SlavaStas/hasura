import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { FastifyRequest } from 'fastify';

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateJWT = (userId: number, role: Role) => {
  return jwt.sign({ userId, role: String(role) }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '1h' });
};

export const authorize = (request: FastifyRequest, role: Role) => {
  console.log(request.user);
  if ((request.user as { role: Role }).role !== role) {
    throw new Error('Permission denied');
  }
};
