const { getUserId } = require('../../utils/index');

module.exports = {
    Tweet: {
        likesCount: async (parent, args, ctx) => {
            const likesCount = await ctx.prisma.like.count({
                where: { tweet: { id: parent.id } }
            });
            return likesCount;
        },
        commentsCount: async (parent, args, ctx) => {
            const commentsCount = await ctx.prisma.comment.count({
                where: { tweet: { id: parent.id } }
            });
            return commentsCount;
        },
        retweetsCount: async (parent, args, ctx) => {
            const retweetsCount = await ctx.prisma.retweet.count({
                where: { tweet: { id: parent.id } }
            });
            return retweetsCount;
        },
        isLiked: async (parent, args, ctx) => {
            const userId = getUserId(ctx);
            if (!userId) throw Error("You need to be authenticated");

            const like = ctx.prisma.like.findMany({
                where: {
                    AND: [
                        { tweet: { id: parent.id } },
                        { user: { id: userId } }
                    ]
                }
            });
            
            return like.length ? true : false;
        },
        isTweetMine: async (parent, args, ctx) => {
            const userId = getUserId(ctx);
            if (!userId) throw Error("You need to be authenticated");

            const tweet = ctx.prisma.tweet.findMany({
                where: {
                    AND: [
                        { id: parent.id },
                        { user: { id: userId } }
                    ]
                }
            });
            
            return tweet.length ? true : false;
        },
        isRetweet: async (parent, args, ctx) => {
            const userId = getUserId(ctx);
            if (!userId) throw Error("You need to be authenticated");

            const retweet = ctx.prisma.retweet.findMany({
                where: {
                    user: { id: userId },
                    tweet: { id: parent.id }
                }
            });
            
            return retweet.length ? true : false;
        }
    }
}