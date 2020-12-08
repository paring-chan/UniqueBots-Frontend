import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER} from "../queries";
import Layout from "../components/Layout";
import {CircularProgress} from "@material-ui/core";
import React from "react";

export default function (Component) {
    return (props) => {
        const {data, error} = useQuery(GET_CURRENT_USER)
        if (!error && !data) {
            return <Layout>
                <CircularProgress/>
            </Layout>
        }
        if (error || !data.me || !data.me.admin) {
            return <Layout>
                관리자만 접근 가능합니다.
            </Layout>
        }
        return <Component {...props} user={data.me}/>
    }
}