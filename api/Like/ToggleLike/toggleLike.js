const { getUserId } = require('../../../utils/index');

module.exports = {
    Mutation: {
        toggleLike: async (parent, args, ctx) => { 
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);
            if (!userId) throw Error("You need to be authenticated");

            const like = await ctx.prisma.like.findMany({
                where: {
                    AND: [
                        { user: { id: userId } },
                        { tweet: { id: parseInt(args.id) } }
                    ]
                }
            });

            if(like.length) {
                await ctx.prisma.like.delete({
                    where: {
                        id: like[0].id
                    }
                });
                return true;
            } 
            
            if(!like.length) {
                await ctx.prisma.like.create({
                    data: {
                        user: { connect: { id: userId } },
                        tweet: { connect: { id: parseInt(args.id) } }
                    }
                });
                return true
            }

            return false;
        }
    }
}