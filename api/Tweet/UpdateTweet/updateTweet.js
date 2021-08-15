const { getUserId } = require('../../../utils/index')

module.exports = {
    Mutation: {
        updateTweet: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);   
            if (!userId) throw Error("You need to be authenticated");

            const { id, ...fieldsToUpdate } = args;
            const tweet = await  ctx.prisma.tweet.findUnique({
                where: {
                    id: parseInt(args.id)
                },
                include: {
                    user: true
                }
            });

            if(!tweet) {
                throw new Error(`Not tweet found for id - ${id}`);
            }

            // check if user owns the specific tweet
            if(userId !== tweet.user.id) {
                throw new Error("You don't have permissions to commit this action");
            }

            // update the tweet
            const updatedTweet = await ctx.prisma.tweet.update({
                where: { id: parseInt(args.id) },
                data: fieldsToUpdate,
                include: {
                    user: true,
                    tags: true,
                    files: true
                }
            });

            return updatedTweet;
        }
    }
}