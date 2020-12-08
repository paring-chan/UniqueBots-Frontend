import React from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";

const Oauth2Callback = () => {
    const [isFirst, setIsFirst] =React.useState(true)

    const params = new URLSearchParams(window.location.search)

    const code = params.get('code')

    if (!code) {
        window.location.assign('/')
        return
    }

    const [login, {data}] = useMutation(gql`
        mutation login($code: String!) {
            login(code: $code)
        }
    `)

    if (isFirst) {
        setIsFirst(false)
        login({variables: {code}})
    }

    if (data) {
        if (data.login) {
            localStorage.setItem('token', data.login)
        }
        window.location.assign('/')
    }
    return <div>로그인 처리중...</div>
}

export default Oauth2Callback;