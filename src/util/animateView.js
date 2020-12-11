import React from 'react';
import {motion} from "framer-motion";

const AnimateView = (Component) => {
    return (props) => {
        return <motion.div initial="hidden" exit="exit" animate="visible" variants={{
            hidden: {
                x: -20,
                opacity: 0
            },
            visible: {
                x: 0,
                opacity: 1
            },
            exit: {
                x: 20,
                opacity: 0
            }
        }}>
            <Component {...props}/>
        </motion.div>
    }
}

export default AnimateView;