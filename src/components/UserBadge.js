import React from 'react';
import * as Icons from '@material-ui/icons'
import {Avatar, Tooltip} from "@material-ui/core";

const UserBadge = ({badge}) => {
    const Icon = Icons[badge.icon]

    return (
        <Tooltip title={badge.name} style={{
            display: 'inline-flex',
            marginRight: 10
        }}>
            <Avatar>
                {Icon ? <Icon/> : badge.id.toUpperCase()}
            </Avatar>
        </Tooltip>
    );
};

export default UserBadge;