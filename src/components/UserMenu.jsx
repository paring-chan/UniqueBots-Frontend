import React from 'react';
import {Person} from "@material-ui/icons";
import {IconButton, ListItem, ListItemText, MenuItem, Popover} from "@material-ui/core";

const UserMenu = ({user}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    return (
        <>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <Person/>
            </IconButton>
            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <ListItem>
                    <ListItemText primary={user.tag}/>
                </ListItem>
                <MenuItem>프로필</MenuItem>
            </Popover>
        </>
    );
};

export default UserMenu;