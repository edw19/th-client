import ApolloClient from "apollo-client"
import { ApolloLink } from "@apollo/client"
import { InMemoryCache } from "apollo-boost"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "apollo-link-error"
import { setContext } from "apollo-link-context"

const Error = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const linkAuth = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("th-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const link = createUploadLink({
  uri: "http://127.0.0.1:5000/graphql",
})

export const cliente = new ApolloClient({
  link: ApolloLink.from([linkAuth, link]),
  credentials: "same-origin",
  //   fetchOptions: {
  //     credentials: "same-origin",
  //   },
  cache: new InMemoryCache({
    addTypename: false,
  }),
  //   defaultOptions: {
  //     query: {
  //       errorPolicy: "all",
  //     },
  //   },
  onError: Error,
})
