import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./apollo";
import {SnackbarProvider} from "notistack";

ReactDOM.render(
    <SnackbarProvider>
        <ApolloProvider client={apolloClient}>
            <App/>
        </ApolloProvider>
    </SnackbarProvider>
    ,
    document.getElementById('root')
);
