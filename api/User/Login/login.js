const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        login: async (parent, args, ctx) => {
            // Check if user with email exists
            const user = await ctx.prisma.user.findFirst({
                where: {
                    email: args.email
                }
            });
            if(!user) throw Error("The email is not registered to an account");

            // check if password is correct
            const isMatch = await bcrypt.compare(args.password, user.password);
            if(!isMatch) throw Error("The password does not match. Try again");

            // send back payload
            const payload = { userId: user.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            // do not send password back
            delete user.password

            return {
                token,
                user,
            };
        }
    }
};