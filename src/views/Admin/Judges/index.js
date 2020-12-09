import React, {Component} from 'react';
import adminOnly from "../../../util/adminOnly";
import {gql, graphql} from "@apollo/react-hoc";
import {CircularProgress, Paper, TableCell, TableContainer, TableRow} from "@material-ui/core";

class Judges extends Component {
    render() {
        return (
            <>
                {
                    this.props.data.loading ? <CircularProgress/> : (
                        this.props.data.error ? '에러' : this.props.data.admin && this.props.data.admin.judges.pages !== 0 ? <TableContainer component={Paper}>
                            <TableRow>
                                <TableCell/>
                                <TableCell>ID</TableCell>
                            </TableRow>
                        </TableContainer> : '대기중인 심사가 없습니다.'
                    )
                }
            </>
        );
    }
}

export default adminOnly(graphql(gql`
    query {
        admin {
            judges(pending: true) {
                pages
                result {
                    id
                    approved
                    requester
                }
            }
        }
    }
`)(Judges));