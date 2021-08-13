module.exports = {
    Query: {
        searchByTweet: async (parent, args, ctx) => {
            return await ctx.prisma.tweet.findMany({
                where: { text: { contains: args.term } },
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
        }
    }
}