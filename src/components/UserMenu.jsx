import React from 'react';
import {Add, LockOpen, Person, Settings} from "@material-ui/icons";
import {Avatar, IconButton, ListItem, ListItemIcon, ListItemText, MenuItem, Popover} from "@material-ui/core";
import {Link} from "react-router-dom";

const UserMenu = ({user}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    return (
        <>
            <IconButton style={{marginLeft: 10}} onClick={e => setAnchorEl(e.currentTarget)}>
                <Person/>
            </IconButton>
            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <ListItem>
                    <ListItemIcon>
                        <Avatar src={user.avatarURL}/>
                    </ListItemIcon>
                    <ListItemText primary={user.tag}/>
                </ListItem>
                <ListItem button component={Link} to={`/user/${user.id}`}>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary="프로필"/>
                </ListItem>
                <ListItem button component={Link} to="/manage">
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary="관리패널"/>
                </ListItem>
                <ListItem button component={Link} to="/addbot">
                    <ListItemIcon>
                        <Add/>
                    </ListItemIcon>
                    <ListItemText primary="봇 추가하기"/>
                </ListItem>
                {
                    user.admin && <ListItem button component={Link} to="/admin/users">
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary="시스템 관리"/>
                    </ListItem>
                }
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