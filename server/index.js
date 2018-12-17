const express = require("express"),
  graphqlHTTP = require("express-graphql"),
  { buildSchema } = require("graphql"),
  app = express();

let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

let root = {
  hello: () => {
    return "Hello World!";
  }
};

app.use("/", (req, res) => {
  res.send("rest api endpoint");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen("8000", () => {
  console.log("server starting on 8000");
});
