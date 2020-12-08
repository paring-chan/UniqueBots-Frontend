import React, {Component} from 'react';
import AdminLayout from "../../components/AdminLayout";
import adminOnly from "../../util/adminOnly";

class AdminPage extends Component {
    render() {
        return (
            <AdminLayout>
                대시보드
            </AdminLayout>
        );
    }
}

export default adminOnly(AdminPage);