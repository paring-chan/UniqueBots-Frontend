import React from 'react';
import Header from "./Header";
import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({
    toolbar: {
        ...theme.mixins.toolbar
    }
}))


const Layout = ({children, header}) => {
    const classes = styles()

    return (
        <div>
            <Header {...header}/>
            <div className={classes.toolbar}/>
            {children}
        </div>
    );
};

export default Layout;