import React from 'react';
import {Button, TableCell, TableRow} from "@material-ui/core";
import BLUE from '@material-ui/core/colors/blue'
import RED from '@material-ui/core/colors/red'
import {Link} from "react-router-dom";

const Bot = ({bot}) => {
    return (
        <TableRow>
            <TableCell>{bot.tag ? `${bot.id}(${bot.tag})` : bot.id}</TableCell>
            <TableCell>{bot.brief}</TableCell>
            <TableCell>
                <Button style={{boxShadow: 'none', backgroundColor: BLUE["500"], width: '100%', color: '#fff'}} variant="contained" component={Link} to={`/bots/${bot.id}`}>
                    봇 정보 보기
                </Button>
            </TableCell>
            <TableCell>
                <Button style={{boxShadow: 'none', backgroundColor: RED["500"], width: '100%', color: '#fff'}} variant="contained">
                    봇 삭제하기
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default Bot;