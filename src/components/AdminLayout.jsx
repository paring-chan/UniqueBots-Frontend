import React, {Component} from 'react';
import Layout from "./Layout";
import {IconButton} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import AdminSidebar from "./AdminSidebar";

class AdminLayout extends Component {
    state = {
        sidebar: false
    }

    render() {
        return (
            <Layout header={{
                beforeTitle: (
                    <IconButton onClick={() => this.setState({sidebar: true})}>
                        <Menu/>
                    </IconButton>
                )
            }}>
                <AdminSidebar open={this.state.sidebar} close={() => this.setState({sidebar: false})}/>
                <main style={{
                    padding: 10
                }}>
                    {this.props.children}
                </main>
            </Layout>
        );
    }
}

export default AdminLayout;