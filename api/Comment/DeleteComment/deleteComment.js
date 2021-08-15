const { getUserId } = require('../../../utils/index')

module.exports = {
    Mutation: {
        deleteComment: async (parent, args, ctx) => {
            // 1. make sure the user  is authenticated
            const userId = getUserId(ctx);   
            if (!userId) throw Error("You need to be authenticated");

            // 2. check if comment exists and the user
            // has the permission to delete it
            const comment = await ctx.prisma.comment.findFirst({
                where: {
                    AND: [
                        { id: parseInt(args.id) },
                        { user: { id: userId}}
                    ]
                }
            });

            if(!comment) throw Error("You don't have permission for this action");

            // 3. delete the comment
            const deletedComment = await ctx.prisma.comment.delete({
                where: {
                    id: parseInt(args.id)
                }
            });

            return deletedComment;
        }
    }
}