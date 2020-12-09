import React, {Component} from 'react';
import AdminLayout from "../../../components/AdminLayout";
import adminOnly from "../../../util/adminOnly";
import {gql, graphql} from "@apollo/react-hoc";
import {CircularProgress, Paper, TableCell, TableContainer, TableRow} from "@material-ui/core";

class Judges extends Component {
    render() {
        return (
            <AdminLayout>
                {
                    this.props.data.loading ? <CircularProgress/> : (
                        this.props.data.error ? '에러' : <TableContainer component={Paper}>
                            <TableRow>
                                <TableCell/>
                            </TableRow>
                        </TableContainer>
                    )
                }
            </AdminLayout>
        );
    }
}

export default adminOnly(graphql(gql`
    query {
        admin {
            judges {
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