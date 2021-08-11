const { getUserId } = require('../../../utils/index')

module.exports = {
    Mutation: {
        editProfile: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);
            if (!userId) throw Error("You need to be authenticated");

            const user = await ctx.prisma.user.update({
                where: { id: userId },
                data: {
                    ...args,
                }
            });

            return user;
        }
    }
}