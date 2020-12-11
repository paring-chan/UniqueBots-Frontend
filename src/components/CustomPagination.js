import React from 'react';
import {usePagination} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core";
import {PaginationItem} from '@material-ui/lab'
import {motion} from "framer-motion";

const useStyles = makeStyles(() => ({
    ul: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }
}))

const AnimatedPaginationItem = motion.custom(PaginationItem)

const CustomPagination = ({delay, ...args}) => {
    const pagination = usePagination(args)
    const classes = useStyles()

    return (
        <div>
            <motion.ul className={classes.ul} variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay || 0.2
                    }
                }
            }} initial="hidden" animate="visible">
                {
                    pagination.items.map((item, key) => {
                        return <AnimatedPaginationItem variants={{
                            hidden: {
                                y: 20,
                                opacity: 0
                            },
                            visible: {
                                y: 0,
                                opacity: 1
                            }
                        }} {...item} key={key}/>
                    })
                }
            </motion.ul>
        </div>
    );
};

export default CustomPagination;