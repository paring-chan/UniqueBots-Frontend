import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import config from "./config";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: config.gql
})

const authLink = setContext((op, {headers}) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? 'Bearer ' + token : ''
        }
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})