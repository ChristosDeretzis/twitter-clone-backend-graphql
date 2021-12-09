const { PrismaClient } = require('@prisma/client')  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    signup: async (parent, args, ctx) => {

      // check if the email and username is unique
      const existingUser = await ctx.prisma.user.findFirst({
          where: {
            OR: [
              {email: args.email},
              {userName: args.userName}
            ]
          }
      });
      

      if (existingUser)
        throw Error("The email/username already exists, try different ones");

      // hash the password, save the user in db
      const hashedPw = await bcrypt.hash(args.password, 10);

      // generate a jsonwebtoken using the userid as payload
      const user = await ctx.prisma.user.create({
        data: {
            ...args,
            password: hashedPw,
        }
      });

      // generate jsonwebtoken using userid as payload
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return {
        token,
        user
      };
    },
  },
};