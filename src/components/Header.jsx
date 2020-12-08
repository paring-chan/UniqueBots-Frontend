import React from 'react';
import {AppBar, CircularProgress, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Lock as LockIcon} from '@material-ui/icons'
import config from "../config";
import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER} from "../queries";

const Header = () => {
    const user = null

    const { loading, data, error } = useQuery(GET_CURRENT_USER)

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
                        loading && !error ? <CircularProgress color="inherit"/> : error || !data?.me ?
                            <IconButton href={`https://discord.com/api/v8/oauth2/authorize?response_type=code&client_id=${config.clientID}&redirect_uri=${config.authRedirect}&scope=identify`}>
                                <LockIcon/>
                            </IconButton> : '로그인됨'
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header

// export default connectStore(Header);