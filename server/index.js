const { GraphQLServer } = require("graphql-yoga");

const Themeparks = require("themeparks");

const typeDefs = `
  type Query {
    hello(name: String): String!
    park(name: String): [String]!
    allParks: [String],
  }



`;

const resolvers = {
  Query: {
    park: (_, { name }) => {
      let Rides = [];

      let park = new Themeparks.Parks[name]();
      park
        .GetWaitTimes()
        .then(function(rides) {
          // print each wait time
          for (var i = 0, ride; (ride = rides[i++]); ) {
            Rides.push(ride);
          }
        }, console.error)
        .then(() => {
          console.log(Rides);
          return Rides;
        });
    },
    allParks: () => {
      let parks = [];
      for (var park in Themeparks.Parks) {
        console.log(park);
        if (park.indexOf("Disney") != -1) {
          parks.push(new Themeparks.Parks[park]().Name);
        }
      }
      return parks;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log("Server is running"));
