const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./utils/index')

const prisma = new PrismaClient()

const createContext = (req) => {
  return {
    ...req,
    prisma,
  }
}

module.exports = {
  createContext: createContext,
}

