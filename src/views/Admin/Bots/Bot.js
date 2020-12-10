import React from 'react';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TableCell,
    TableRow
} from "@material-ui/core";
import BLUE from '@material-ui/core/colors/blue'
import RED from '@material-ui/core/colors/red'
import {Link} from "react-router-dom";
import GREEN from "@material-ui/core/colors/green";
import {apolloClient} from "../../../apollo";
import {gql} from "@apollo/client";
import {useSnackbar} from "notistack";

const Bot = ({bot, refetch}) => {
    const snackbar = useSnackbar()

    const [deleteModal, setDeleteModal] = React.useState(false)
    const [processingDelete, setProcessingDelete] = React.useState(false)

    const deleteBot = async () => {
        setProcessingDelete(true)

        const res = await apolloClient.query({
            query: gql`
                query ($id:String!) {
                    admin {
                        bot(id: $id) {
                            delete
                        }
                    }
                }
            `,
            variables: {
                id: bot.id
            }
        })

        if (res.data?.admin?.bot?.delete) {
            snackbar.enqueueSnackbar('봇이 삭제되었습니다.', {
                variant: 'success'
            })
        }
        setDeleteModal(false)
        setProcessingDelete(false)
        refetch()
    }

    return (
        <>
            <TableRow>
                <TableCell>{bot.tag ? `${bot.id}(${bot.tag})` : bot.id}</TableCell>
                <TableCell>{bot.brief}</TableCell>
                <TableCell>
                    <Button style={{boxShadow: 'none', backgroundColor: BLUE["500"], width: '100%', color: '#fff'}}
                            variant="contained" component={Link} to={`/bots/${bot.id}`}>
                        봇 정보 보기
                    </Button>
                </TableCell>
                <TableCell>
                    <Button style={{boxShadow: 'none', backgroundColor: RED["500"], width: '100%', color: '#fff'}}
                            variant="contained" onClick={() => setDeleteModal(true)}>
                        봇 삭제하기
                    </Button>
                </TableCell>
            </TableRow>
            <Dialog open={deleteModal}>
                <DialogTitle>봇을 삭제할까요?</DialogTitle>
                <DialogActions>
                    <Button style={{color: GREEN['500'], borderColor: GREEN['500']}}
                            disabled={processingDelete} onClick={() => {
                        setProcessingDelete(false)
                        setDeleteModal(false)
                    }}>
                        취소
                    </Button>
                    <Button disabled={processingDelete}
                            style={{color: RED["500"], borderColor: RED["500"]}} autoFocus
                            onClick={deleteBot.bind(this)}>
                        {
                            processingDelete ?
                                <CircularProgress size={25} style={{color: RED["500"]}}/> : '확인'
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Bot;