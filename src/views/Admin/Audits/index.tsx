import * as React from 'react';
import {gql, graphql} from "@apollo/react-hoc";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import moment from 'moment';

class Audits extends React.Component<any, any> {
    componentDidMount() {
        this.props.data.refetch()
    }

    render() {
        const {loading, admin} = this.props.data

        let arr = []

        if (admin?.audits) {
            for (const audit of admin.audits) {
                arr.push(audit)
            }
        }

        return (
            <div>
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
                                                    arr.sort((a: any, b: any) => {
                                                        return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
                                                    }).map((audit: any, key: number) => (
                                                        <TableRow key={key}>
                                                            <TableCell>{audit.user.tag}</TableCell>
                                                            <TableCell>{moment(Number(audit.timestamp)).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                                            <TableCell>{audit.msg}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
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