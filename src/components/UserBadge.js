import React from 'react';
import * as Icons from '@material-ui/icons'
import {Avatar, Tooltip} from "@material-ui/core";
import {motion} from "framer-motion";

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
    const Icon = Icons[badge.icon]

    return (
        <MotionTooltip variants={variants} title={badge.name} style={{
            display: 'inline-flex',
            marginRight: 10
        }}>
            <Avatar>
                {Icon ? <Icon/> : badge.id.toUpperCase()}
            </Avatar>
        </MotionTooltip>
    );
};

export default UserBadge;