const { ApolloServer } = require('apollo-server')
const schema = require("./schema");
const { createContext } = require("./context");
const server = new ApolloServer({
  schema,
  context: createContext
});

const PORT = process.env.PORT || 7777;

server.listen({port: PORT}).then(({ url }) =>
  console.log(
    `\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql-auth#using-the-graphql-api`,
  ),
)