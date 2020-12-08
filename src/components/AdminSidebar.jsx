import React, {Component} from 'react';
import {Drawer, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Dashboard, SettingsApplications} from "@material-ui/icons";
import {Link} from "react-router-dom";

class AdminSidebar extends Component {
    render() {
        return (
            <Drawer open={this.props.open} onClose={this.props.close}>
                <ListItem button component={Link} to="/admin">
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary="대시보드"/>
                </ListItem>
                <ListItem button component={Link} to="/admin/bots">
                    <ListItemIcon>
                        <SettingsApplications/>
                    </ListItemIcon>
                    <ListItemText primary="봇 관리"/>
                </ListItem>
            </Drawer>
        );
    }
}

export default AdminSidebar;