import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER} from "../queries";
import {CircularProgress} from "@material-ui/core";
import React from "react";

export default function (Component) {
    return (props) => {
        const {data, error} = useQuery(GET_CURRENT_USER)
        if (!error && !data) {
            return <CircularProgress/>
        }
        if (error || !data.me) {
            return '로그인 한 사용자만 접근 가능합니다.'
        }
        return <Component {...props} user={data.me}/>
    }
}