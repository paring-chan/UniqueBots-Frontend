import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import config from "./config";
import {setContext} from "@apollo/client/link/context";

const isDev = process.env.NODE_ENV !== 'production'

const httpLink = createHttpLink({
    uri: config.gql
})

const authLink = setContext((op, {headers}) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            Authorization: token ? 'Bearer ' + token : ''
        }
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    admin: {
                        merge: true
                    }
                }
            }
        }
    }),
    connectToDevTools: isDev
})