module.exports = {
    Query: {
        tweet: async (parent, args, ctx) => {
            return await ctx.prisma.tweet.findUnique({
                where: { id: parseInt(args.id) },
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
                    }, 
                    comments: {
                        include: {
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
                    }
                }
            });
        }
    }
}