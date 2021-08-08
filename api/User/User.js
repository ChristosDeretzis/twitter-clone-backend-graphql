const { getUserId } = require('../../utils/index');

module.exports = {
    User: {
      fullname: (parent, args, ctx) => {
        return `${parent.firstname} ${parent.lastname}`;
      },
      isSelf: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return userId === parent.id;
      },
    },
  };