module.exports = {
    Query: {
        profile: async (parent, args, ctx) => {
            const user = await ctx.prisma.user.findUnique({
                where: {
                    userName: args.userName
                }
            });

            if (!user) throw Error(`No user found for username - ${args.userName}`);

            return ctx.prisma.user.findUnique({
                where: {
                    userName: args.userName
                },
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
            })
        }
    }
}