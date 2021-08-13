const { getUserId } = require('../../../utils/index');

module.exports = {
    Query: {
        feed: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);   
            if (!userId) throw Error("You need to be authenticated");

            const following = await ctx.prisma.user.findUnique({ where: { id: userId } }).following();

            const userIds = following.map((user) => user.id).concat([userId]);

            const tweets = await ctx.prisma.tweet.findMany({
                where: {
                    user: {
                        id: { in: userIds }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    tags: {
                        select: {
                            id: true,
                            text: true
                        }
                    },
                    files: {
                        select: {
                            id: true,
                            url: true
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            userName: true,
                            avatar: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            });

            return tweets;
        }
    }
}