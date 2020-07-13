import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-boost'
import { createUploadLink } from 'apollo-upload-client'
import { onError } from "apollo-link-error";


const Error = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = createUploadLink({ uri: 'http://localhost:5000/graphql' })

export const cliente = new ApolloClient({
    link,
    fetchOptions: {
        credentials: 'include'
    },
    cache: new InMemoryCache({
        addTypename: false
    }),
    defaultOptions: {
        query: {
            errorPolicy: 'all'
        }
    },
    onError: Error
})
