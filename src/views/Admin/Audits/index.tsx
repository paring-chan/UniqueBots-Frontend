import * as React from 'react';
import {gql, graphql} from "@apollo/react-hoc";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow, Typography
} from "@material-ui/core";
import moment from 'moment';
import _ from 'lodash'

class Audits extends React.Component<any, any> {
    componentDidMount() {
        this.props.data.refetch()
    }

    state = {
        page: 0,
        rowsPerPage: 10
    }

    render() {
        const {loading, admin} = this.props.data

        let arr: any[] = []

        const {rowsPerPage, page} = this.state

        if (admin?.audits) {
            for (const i of admin.audits) {
                arr.push(i)
            }
        }

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, arr.length - page * rowsPerPage)

        return (
            <div>
                <Typography variant="h4">감사로그</Typography>
                {
                    loading ? <CircularProgress/> : (
                        <div>
                            {
                                admin?.audits ? (
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>유저</TableCell>
                                                    <TableCell>발생한 시각</TableCell>
                                                    <TableCell>메시지</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    (
                                                        rowsPerPage > 0 ? arr.sort((a: any, b: any) => {
                                                            return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
                                                        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : arr
                                                    ).map((audit, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell>{audit.user.tag}</TableCell>
                                                            <TableCell>{moment(Number(audit.timestamp)).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                                            <TableCell>{audit.msg}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TablePagination count={admin.audits.length}
                                                                     onChangePage={(event, page1) => this.setState({page: page1})}
                                                                     page={this.state.page}
                                                                     rowsPerPage={this.state.rowsPerPage} onChangeRowsPerPage={e => this.setState({rowsPerPage: parseInt(e.target.value, 10)})}/>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                ) : '감사로그를 가져올 수 없습니다.'
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

export default graphql(gql`
    query {
        admin {
            audits {
                msg
                user {
                    tag
                }
                timestamp
            }
        }
    }
`)(Audits)