const { getUserId } = require('../../utils/index');

module.exports = {
    Comment: {
        isCommentMine: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);   
            if (!userId) throw Error("You need to be authenticated");

            const comment = await ctx.prisma.comment.findFirst({
                where: {
                    AND: [
                        { id: parseInt(parent.id) },
                        { user: { id: userId}}
                    ]
                }
            });

            return comment !== null;
        }
    }
}