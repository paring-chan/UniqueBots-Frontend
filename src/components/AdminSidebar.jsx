import React, {Component} from 'react';
import {Drawer, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Dashboard, Gavel, List, People, SettingsApplications} from "@material-ui/icons";
import {Link} from "react-router-dom";

class AdminSidebar extends Component {
    render() {
        return (
            <Drawer open={this.props.open} onClose={this.props.close}>
                <ListItem onClick={this.props.close} button component={Link} to="/admin">
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary="대시보드"/>
                </ListItem>
                <ListItem onClick={this.props.close} button component={Link} to="/admin/bots">
                    <ListItemIcon>
                        <SettingsApplications/>
                    </ListItemIcon>
                    <ListItemText primary="봇 관리"/>
                </ListItem>
                <ListItem onClick={this.props.close} button component={Link} to="/admin/judges">
                    <ListItemIcon>
                        <Gavel/>
                    </ListItemIcon>
                    <ListItemText primary="심사 관리"/>
                </ListItem>
                <ListItem onClick={this.props.close} button component={Link} to="/admin/users">
                    <ListItemIcon>
                        <People/>
                    </ListItemIcon>
                    <ListItemText primary="유저 관리"/>
                </ListItem>
                <ListItem onClick={this.props.close} button component={Link} to="/admin/audits">
                    <ListItemIcon>
                        <List/>
                    </ListItemIcon>
                    <ListItemText primary="감사 로그"/>
                </ListItem>
            </Drawer>
        );
    }
}

export default AdminSidebar;