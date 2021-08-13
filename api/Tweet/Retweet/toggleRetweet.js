const { getUserId } = require('../../../utils/index')

module.exports = {
    Mutation: {
        toggleRetweet: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);   
            if (!userId) throw Error("You need to be authenticated");

            // 2. check if tweet exists
            const argId = +args.id;
            const tweet = await  ctx.prisma.tweet.findUnique({
                where: {
                    id: argId
                }
            });

            if(!tweet) {
                throw new Error(`Not tweet found for id - ${args.id}`);
            }

            // 3. make sure it is someone else's tweet
            const isTweetMine = await ctx.prisma.tweet.findFirst({
                where: {
                    AND: [{ id: argId }, { user: { id: userId } }]
                }
            });
            if (isTweetMine) throw Error("You cannot retweet your own tweet");

            // 4. retweet the tweet if it hasn't
            const retweet = await ctx.prisma.retweet.findMany({
                where: {
                    AND: [{ tweet: { id: argId } }, { user: { id: userId } }]
                }
            });
            console.log(retweet.length);

            if(retweet.length) {
                await ctx.prisma.retweet.delete({
                    where: { id: retweet[0].id }
                });
                return true;
            } else {
                await ctx.prisma.retweet.create({
                    data: {
                        user: {
                            connect: { id: userId }
                        },
                        tweet: {
                            connect: { id: argId }
                        }
                    }
                });
                return true;
            }
            return false;
        }
    }
}