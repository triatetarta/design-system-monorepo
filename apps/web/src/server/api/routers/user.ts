import { protectedProcedure, createTRPCRouter } from "../trpc";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const users = prisma.user.findMany();

    return users;
  }),
});
