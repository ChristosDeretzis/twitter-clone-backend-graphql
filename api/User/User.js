const { getUserId } = require('../../utils/index');

module.exports = {
    User: {
      fullname: (parent, args, ctx) => {
        return `${parent.firstName} ${parent.lastName}`;
      },
      isSelf: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return userId === parent.id;
      },
      isFollowing: async (parent, args, ctx) => {
        const userId = getUserId(ctx);
        const following = await ctx.prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        }).following({
          where: {
            id: parseInt(parent.id)
          }
        });
        
        return following.length ? true : false;
      }, followersCount: async (parent, args, ctx) => {
        const followers = await ctx.prisma.user.findUnique({
            where: {
                id: parent.id
            }
        }).followers();
        return followers.length;
      }, followingCount: async (parent, args, ctx) => {
        const following = await ctx.prisma.user.findUnique({
            where: {
                id: parent.id
            }
        }).following();
        return following.length;
      }, tweetsCount: async (parent, args, ctx) => {
        const tweetsCount = await ctx.prisma.tweet.count({
            where: { user: { id: parent.id } }
        });
        return tweetsCount;
      },


  }
  };