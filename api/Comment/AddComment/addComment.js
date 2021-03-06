const { getUserId } = require('../../../utils/index');

module.exports = {
    Mutation: {
        addComment: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);   
            if (!userId) throw Error("You need to be authenticated");

            // check if tweet exists
            const tweet = await ctx.prisma.tweet.findFirst({
                where: {
                    id: parseInt(args.id)
                }
            });

            if(!tweet) {
                throw new Error(`Not tweet found for id - ${id}`);
            }

            const comment = await ctx.prisma.comment.create({
                data: {
                    text: args.text,
                    tweet: {
                        connect: { id: parseInt(args.id) }
                    },
                    user: {
                        connect: { id: userId }
                    }
                },
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
            });

            return comment;
        }
    }
}