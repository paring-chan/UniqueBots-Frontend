import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Lock as LockIcon} from '@material-ui/icons'

const Header = () => {
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
                    <IconButton>
                        <LockIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;