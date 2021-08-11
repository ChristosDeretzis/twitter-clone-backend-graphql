module.exports = {
    Query: {
        searchByUser: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany({
                where: {
                    OR: [
                        {
                            userName: {
                                contains: args.term, 
                            },
                        },
                        {
                            firstName: {
                                contains: args.term, 
                            },
                        },
                        {
                            lastName: {
                                contains: args.term, 
                            },
                        },
                    ],
                }
            });
        }
    }
}