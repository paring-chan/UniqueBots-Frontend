import React from 'react';
import {AppBar, CircularProgress, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Lock as LockIcon} from '@material-ui/icons'
import {connectStore} from "../store";

const Header = ({user}) => {
    return (
        <>
            <AppBar color="inherit" style={{
                boxShadow: 'none'
            }}>
                <Toolbar>
                    <Typography component={Link} to="/" style={{
                        textDecoration: 'none',
                        color: '#fff'
                    }} variant="h6">
                        UniqueBots
                    </Typography>
                    <div style={{flexGrow: 1}}/>
                    {
                        user === null ? <CircularProgress color="inherit"/> : user === false ? <IconButton>
                            <LockIcon/>
                        </IconButton> : '로그인됨'
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default connectStore(Header);