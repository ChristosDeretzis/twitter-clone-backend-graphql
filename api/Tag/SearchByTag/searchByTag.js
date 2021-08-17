module.exports = {
    Query: {
        searchByTag: async (parent, args, ctx) => {
            const tweets = await ctx.prisma.tag.findMany({
                where: {
                    text: {
                        contains: args.term
                    }
                },
                include: {
                    tweets: {
                        include: {
                            files: true,
                            tags: true,
                            user: true
                        }
                    }
                }
            });

            return tweets.length ? tweets[0].tweets : [];
        }
    }
}