const { getUserId } = require('../../../utils/index')

module.exports = {
    Mutation: {
        newTweet: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);
            if (!userId) throw Error("You need to be authenticated");

            // 2. create a new tweet
            const { text, files, tags = [] } = args;

            const tweet = await ctx.prisma.tweet.create({
                data: {
                    text,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
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

            if(files && files.length) {
                files.forEach(async (file) => {
                    await ctx.prisma.file.create({
                        data: {
                           url: file,
                           tweet: { connect: { id: tweet.id } },
                           user: { connect: { id: userId } } 
                        }
                    });
                });
            }

            if(tags && tags.length) {
                tags.forEach(async (tag) => {

                    const res = await ctx.prisma.tag.findFirst({
                        where: {
                            text: tag
                        }
                    });

                    if (res) {
                        await ctx.prisma.tag.update({
                            where: {
                                id: res.id
                            },
                            data: {
                                tweets: {
                                    connect: { id: tweet.id }
                                }
                            }
                        });
                    } else {
                        await ctx.prisma.tag.create({
                            data: {
                                text: tag,
                                tweets: {
                                    connect: { id: tweet.id }
                                }
                            }
                        });
                    }

                });
            }

            return tweet;

        }
    }
}