import React from 'react';
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import GREY from '@material-ui/core/colors/grey'

const NotFound = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 99999,
            background: GREY["900"]
        }}>
            <Typography variant="h4">404 Not Found</Typography>
            <Typography>페이지를 찾을 수 없습니다.</Typography>
            <Button component={Link} to="/">홈으로</Button>
        </div>
    );
};

export default NotFound;