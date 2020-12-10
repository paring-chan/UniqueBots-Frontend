import React, {Component} from 'react';
import adminOnly from "../../../util/adminOnly";
import {gql, graphql} from "@apollo/react-hoc";
import {
    Button,
    CircularProgress, Dialog, DialogActions, DialogTitle,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import GREEN from "@material-ui/core/colors/green";
import RED from "@material-ui/core/colors/red";
import {apolloClient} from "../../../apollo";
import {withSnackbar} from "notistack";

const PROMOTE_QUERY = gql`
    query ($id: String!) {
        admin {
            user(id: $id) {
                user {
                    id
                }
                promote
            }
        }
    }
`
const REMOVE_MODERATOR_QUERY = gql`
    query ($id: String!) {
        admin {
            user(id: $id) {
                user {
                    id
                }
                removeMod
            }
        }
    }
`

class UserComponent extends Component {
    state = {
        dialog__promote_mod: false,
        processing__promote_mod: false,
        dialog__remove_mod: false,
        processing__remove_mod: false,
    }

    async promote() {
        this.setState({processing__promote_mod: true})
        try {
            const data = await apolloClient.query({
                query: PROMOTE_QUERY,
                variables: {
                    id: this.props.user.user.id
                }
            })
            if (data.data.admin?.user?.promote) {
                this.props.enqueueSnackbar('유저에게 관리자 권한을 부여했습니다.', {
                    variant: 'success'
                })
            }
        } finally {
            this.closeMod()
            await this.props.refetch()
        }
    }

    closeMod() {
        this.setState({processing__promote_mod: false, dialog__promote_mod: false})
    }

    async removeMod() {
        this.setState({processing__remove_mod: true})
        try {
            const data = await apolloClient.query({
                query: REMOVE_MODERATOR_QUERY,
                variables: {
                    id: this.props.user.user.id
                }
            })
            if (data.data.admin?.user?.removeMod) {
                this.props.enqueueSnackbar('유저에게서 관리자 권한을 제거했습니다.', {
                    variant: 'success'
                })
            }
        } finally {
            this.closeRemoveModModal()
            await this.props.refetch()
        }
    }

    closeRemoveModModal() {
        this.setState({processing__remove_mod: false, dialog__remove_mod: false})
    }

    render() {
        const {user: {user}} = this.props

        return <>
            <TableRow>
                <TableCell>
                    {user.id}
                </TableCell>
                <TableCell>
                    {user.tag}
                </TableCell>
                <TableCell>
                    <Button variant="contained"
                            style={!user.admin ? {
                                width: '100%',
                                boxShadow: 'none',
                                backgroundColor: GREEN["500"],
                                color: '#fff'
                            } : user.id === this.props.me ? {width: '100%', boxShadow: 'none'} : {
                                width: '100%',
                                boxShadow: 'none',
                                backgroundColor: RED["500"],
                                color: '#fff'
                            }}
                            onClick={() => this.setState({[`dialog__${user.admin ? 'remove' : 'promote'}_mod`]: true})}
                            disabled={user.id === this.props.me}>관리자 권한 {user.admin ? '제거' : '부여'}</Button>
                </TableCell>
            </TableRow>
            <Dialog open={this.state.dialog__promote_mod}>
                <DialogTitle>유저에게 관리자 권한을 부여할까요?</DialogTitle>
                <DialogActions>
                    <Button style={{color: RED['500'], borderColor: RED['500']}}
                            disabled={this.state.processing__promote_mod} onClick={() => this.closeMod()}>
                        취소
                    </Button>
                    <Button disabled={this.state.processing__promote_mod}
                            style={{color: GREEN["500"], borderColor: GREEN["500"]}} autoFocus
                            onClick={this.promote.bind(this)}>
                        {
                            this.state.processing__promote_mod ?
                                <CircularProgress size={25} style={{color: GREEN["500"]}}/> : '확인'
                        }
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={this.state.dialog__remove_mod}>
                <DialogTitle>유저에게서 관리자 권한을 제거할까요?</DialogTitle>
                <DialogActions>
                    <Button style={{color: RED['500'], borderColor: RED['500']}}
                            disabled={this.state.processing__promote_mod} onClick={() => this.closeRemoveModModal()}>
                        취소
                    </Button>
                    <Button disabled={this.state.processing__promote_mod}
                            style={{color: GREEN["500"], borderColor: GREEN["500"]}} autoFocus
                            onClick={this.removeMod.bind(this)}>
                        {
                            this.state.processing__promote_mod ?
                                <CircularProgress size={25} style={{color: GREEN["500"]}}/> : '확인'
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    }
}

const User = withSnackbar(UserComponent)

class Users extends Component {
    render() {
        return (
            <>
                {
                    this.props.data.loading ? <CircularProgress/> : (
                        this.props.data.error ? '에러' : this.props.data.admin && this.props.data.admin.users.length !== 0 ?
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>태그</TableCell>
                                            <TableCell>관리자 권한 부여</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.data.admin.users.map((it, i) => (
                                                <User me={this.props.user.id} refetch={() => this.props.data.refetch()}
                                                      user={it} key={i}/>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer> : '유저가 없습니다'
                    )
                }
            </>
        );
    }
}

export default adminOnly(graphql(gql`
    query {
        admin {
            users {
                user {
                    id
                    admin
                    tag
                }
            }
        }
    }
`)(Users));