import React from 'react';
import {LockOpen, Person} from "@material-ui/icons";
import {Avatar, IconButton, ListItem, ListItemIcon, ListItemText, MenuItem, Popover} from "@material-ui/core";

const UserMenu = ({user}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    return (
        <>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <Person/>
            </IconButton>
            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <ListItem>
                    <ListItemIcon>
                        <Avatar src={user.avatarURL}/>
                    </ListItemIcon>
                    <ListItemText primary={user.tag}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary="프로필"/>
                </ListItem>
                <ListItem button onClick={() => {
                    localStorage.removeItem('token')
                    window.location.reload()
                }}>
                    <ListItemIcon>
                        <LockOpen/>
                    </ListItemIcon>
                    <ListItemText primary="로그아웃"/>
                </ListItem>
            </Popover>
        </>
    );
};

export default UserMenu;