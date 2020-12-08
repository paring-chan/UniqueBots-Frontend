import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./apollo";
// import {Provider} from "react-redux";
//import store from "./store";

ReactDOM.render(
    //<Provider store={store}>
        <ApolloProvider client={apolloClient}>
            <App/>
        </ApolloProvider>
    //</Provider>
    ,
  document.getElementById('root')
);
