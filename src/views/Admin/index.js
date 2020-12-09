import React, {Component} from 'react';
import adminOnly from "../../util/adminOnly";

class AdminPage extends Component {
    render() {
        return (
            <>
                대시보드
            </>
        );
    }
}

export default adminOnly(AdminPage);