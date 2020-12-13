import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./apollo";
import {SnackbarProvider} from "notistack";
import './markdown.scss'

ReactDOM.render(
    <SnackbarProvider>
        <ApolloProvider client={apolloClient}>
            <App/>
        </ApolloProvider>
    </SnackbarProvider>
    ,
    document.getElementById('root')
);
