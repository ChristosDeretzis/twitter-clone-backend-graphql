const { getUserId } = require('../../../utils/index')

module.exports = {
    Query: {
        users: async (parent, args, ctx) => {
             // make sure the user  is authenticated
            const userId = getUserId(ctx);
            if (!userId) throw Error("You need to be authenticated");

            const following = await ctx.prisma.user.findUnique({ where: {id: userId}}).following();

            const userIds = following.map((user) => user.id);

            return await ctx.prisma.user.findMany({
                where: {
                    id: {
                        in: +userIds
                    }
                },
                take: 4
            });
        }
    }
}