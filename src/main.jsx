import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { CookiesProvider } from "react-cookie";

// setting configuration for http connect for Query and Mutation
// You can use http://localhost:3000/graphql for local development
const httpLink = new HttpLink({
  uri: "https://elemente-backend.up.railway.app/graphql", //backend link,e. check backend console for link
});

// setting configuration for websocket connect for subscription
// You can use http://localhost:3000/graphql for local development
const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://elemente-backend.up.railway.app/graphql", // backend link, check backend console for link
  }),
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // web socket connection for subscriptions
  httpLink, // http connection for query and mutation
);

// setting up apollo client with the server http and websocket links
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(), // for in memory caching of data
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <App />
      </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
