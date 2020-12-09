import React, {Component} from 'react';
import AdminLayout from "./AdminLayout";
import Layout from "./Layout";
import {withRouter} from "react-router-dom";

class LayoutProvider extends Component {
    render() {
        let Component

        if (this.props.location.pathname.startsWith('/admin')) {
            Component = AdminLayout
        } else {
            Component = Layout
        }

        return (
            <Component>
                {this.props.children}
            </Component>
        );
    }
}

export default withRouter(LayoutProvider);