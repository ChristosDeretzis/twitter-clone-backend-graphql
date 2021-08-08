const { PrismaClient } = require('@prisma/client')  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    signup: async (parent, args, ctx) => {
        console.log(args.firstname)

      // check if the email and username is unique
      const existingUser = await ctx.prisma.user.findFirst({
          where: {
            email: args.email
          }
      });
      

      if (existingUser)
        throw Error("The email/handle already exists, try different ones");

      // hash the password, save the user in db
      const hashedPw = await bcrypt.hash(args.password, 10);
      console.log(hashedPw);

      // generate a jsonwebtoken using the userid as payload
      const user = await ctx.prisma.user.create({
        data: {
            firstName: args.firstname,
            lastName: args.lastname,
            email: args.email,
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