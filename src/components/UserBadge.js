import React from 'react';
import * as Icons from '@mdi/js'
import {Avatar, Tooltip} from "@material-ui/core";
import {motion} from "framer-motion";
import Icon from "@mdi/react";

const MotionTooltip = motion.custom(Tooltip)

const variants = {
    hidden: {
        y: 20,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1
    }
}

const UserBadge = ({badge}) => {
    const icon = Icons[badge.icon.replace(/-([a-z])/g, g => g[1].toUpperCase())]

    return (
        <MotionTooltip variants={variants} title={badge.name} style={{
            display: 'inline-flex',
            marginRight: 10
        }}>
            <Avatar>
                {icon ? <Icon path={icon}/> : badge.id.toUpperCase()}
            </Avatar>
        </MotionTooltip>
    );
};

export default UserBadge;