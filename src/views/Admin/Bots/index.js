import React, {Component} from 'react';
import {
    CircularProgress,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import adminOnly from "../../../util/adminOnly";
import {gql, graphql} from '@apollo/react-hoc'
import Bot from "./Bot";

class ManageBots extends Component {
    componentDidMount() {
        this.props.data.refetch()
    }

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
                {loading && !error ? <CircularProgress/> : !admin || error ? '에러처리' : <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>짧은 설명</TableCell>
                                    <TableCell>더보기</TableCell>
                                    <TableCell>삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    admin.bots.map((it, key) => <Bot key={key} bot={it} refetch={this.props.data.refetch}/>)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>}
            </>
        );
    }
}

export default adminOnly(graphql(gql`
    query {
        admin {
            bots {
                id
                approved
                brief
                tag
            }
        }
    }
`)(ManageBots));