// import { PrismaClient } from '@prisma/client';
//
// declare module 'fastify' {
//   interface FastifyInstance {
//     prisma: PrismaClient;
//     verifyJwt: any;
//   }
// }

import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;

    jwt: {
      sign: (payload: object, options?: object) => string;
      verify: (token: string, options?: object) => object;
      decode: (token: string) => null | { [key: string]: any } | string;
    };

    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }

  interface FastifyRequest {
    verifyJwt: () => Promise<object>;
  }

}