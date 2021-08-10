const { verify } = require('jsonwebtoken')

exports.getUserId = (ctx) => {
  const authHeader = ctx.req.get('Authorization')
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const verifiedToken = verify(token, process.env.JWT_SECRET)
    return verifiedToken && Number(verifiedToken.userId)
  }

  throw Error("You need to be authenticated.");
};