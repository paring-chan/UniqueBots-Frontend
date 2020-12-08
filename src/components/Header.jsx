import React from 'react';
import {AppBar, CircularProgress, Icon, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Lock as LockIcon, Person} from '@material-ui/icons'
import config from "../config";
import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER} from "../queries";
import UserMenu from "./UserMenu";

const Header = ({beforeTitle=null}) => {
    const { loading, data, error } = useQuery(GET_CURRENT_USER)

    return (
        <>
            <AppBar color="inherit" style={{
                boxShadow: 'none'
            }}>
                <Toolbar style={{
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                    {beforeTitle}
                    <Typography component={Link} to="/" style={{
                        textDecoration: 'none',
                        color: '#fff',
                        marginLeft: beforeTitle ? 10 : undefined
                    }} variant="h6">
                        UniqueBots
                    </Typography>
                    <div style={{flexGrow: 1}}/>
                    {
                        loading && !error ? <CircularProgress color="inherit"/> : error || !data?.me ?
                            <IconButton href={`https://discord.com/api/v8/oauth2/authorize?response_type=code&client_id=${config.clientID}&redirect_uri=${config.authRedirect}&scope=identify`}>
                                <LockIcon/>
                            </IconButton> : <UserMenu user={data.me}/>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header

// export default connectStore(Header);