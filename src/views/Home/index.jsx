import React, {Component} from 'react';
import {gql, graphql} from "@apollo/react-hoc";

class HomePage extends Component {
    render() {
        return (
            <>
                홈
            </>
        );
    }
}

export default graphql(gql`
query {
    bots {
        pages
    }
}
`)(HomePage)