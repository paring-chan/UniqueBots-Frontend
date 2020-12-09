import React, {Component} from 'react';
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import adminOnly from "../../../util/adminOnly";
import Bot from "./Bot";
import {gql, graphql} from '@apollo/react-hoc'

class ManageBots extends Component {
    render() {
        const {data: {loading, error, admin}} = this.props

        return (
            <>
                <Typography variant="h6">
                    봇 관리
                </Typography>
                <Typography variant="body2">
                    등록된 봇을 조회/관리 할 수 있습니다.
                </Typography>
                {loading && !error ? <CircularProgress/> : !admin || error ? '에러처리': <Grid container spacing={1}>
                    {admin.bots.result.map((bot, i) => (
                        <Grid item xs={12} md={6} lg={4} key={i}>
                            <Bot bot={bot}/>
                        </Grid>
                    ))}
                </Grid>}
            </>
        );
    }
}

export default adminOnly(graphql(gql`
query {
    admin {
        bots {
            pages
            result {
                id
                approved
                brief
                tag
            }
        }
    }
}
`)(ManageBots));