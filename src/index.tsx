import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./apollo";
import {SnackbarProvider} from "notistack";
import './markdown.scss'
import { Provider } from 'react-redux';
import store from "./store";

ReactDOM.render(
    <SnackbarProvider>
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <App/>
            </ApolloProvider>
        </Provider>
    </SnackbarProvider>
    ,
    document.getElementById('root')
);
