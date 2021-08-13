module.exports = {
    Query: {
        tweet: async (parent, args, ctx) => {
            const argId = +args.id;
            return await ctx.prisma.tweet.findUnique({
                where: { id: argId },
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