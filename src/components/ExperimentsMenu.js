import React from 'react';
import {Fab, makeStyles} from "@material-ui/core";
import {connectStore} from "../store";
import {Add} from "@material-ui/icons";
import clsx from "clsx";
import ExperimentsDialog from "./ExperimentsDialog";

const useStyles = makeStyles(theme => {
    return {
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('all', {
                duration: theme.transitions.duration.short
            }),
            zIndex: 99999,
        },
        fabOpen: {
            transform: 'rotate(45deg)',
            [theme.breakpoints.up('sm')]: {
                bottom: `calc(100% - 56px)`,
                width: 48,
                height: 48
            },
            [theme.breakpoints.down('xs')]: {
                bottom: `calc(100% - 52px)`,
                width: 48,
                height: 48
            },
            boxShadow: 'none'
        }
    }
})



const ExperimentsMenu = ({experiments}) => {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false)

    return (
        <>
            {
                experiments.isDeveloper && <Fab color="primary" className={clsx(classes.fab, {
                    [classes.fabOpen]: open
                })} onClick={() => setOpen(!open)}>
                    <Add/>
                </Fab>
            }
            <ExperimentsDialog open={open}/>
        </>
    );
};

export default connectStore(ExperimentsMenu);