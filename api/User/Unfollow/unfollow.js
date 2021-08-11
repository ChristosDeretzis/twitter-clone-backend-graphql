const { getUserId } = require('../../../utils/index')

module.exports = {
    Mutation: {
        unfollow: async (parent, args, ctx) => {
            const argId = +args.id;
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);
            
            if (!userId) throw Error("You need to be authenticated");

            // 2. throw an error if the user is already following
            const following = await ctx.prisma.user.findUnique({
                where: {
                    id: userId
                }
            }).following({
                where: {
                    id: argId
                }
            });
            if (!following.length) throw Error("You are not following him.");

            // 3. Follow the user 
            await ctx.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    following: {
                        disconnect: {
                            id: argId
                        }
                    }
                }
            });
            return true;
        }
    }
};