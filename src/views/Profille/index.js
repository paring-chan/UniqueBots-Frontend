import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {withRouter} from "react-router-dom";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import UserBadge from "../../components/UserBadge";
import {Pagination} from "@material-ui/lab";

function ProfileView({match: {params: {id}}}) {
    const {loading, error, data} = useQuery(gql`
        query ($id: String!, $botsPage: Int!) {
            user(id: $id) {
                id
                tag
                discriminator
                avatarURL
                badges {
                    id
                    icon
                    name
                }
                bots(page: $botsPage) {
                    pages
                    result {
                        brief
                        id
                        tag
                    }
                }
            }
        }
    `, {
        variables: {
            id,
            botsPage: 1
        }
    })

    return <div>
        {
            error ? error.toString() : loading ? <CircularProgress/> : data.user ? (() => {
                const user = data.user
                return <>
                    <Grid container>
                        <Grid item xs={12} md={6} style={{
                            textAlign: 'center'
                        }}>
                            <img src={user.avatarURL} alt="Profile Image" width={250} height={250}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4">{user.tag}</Typography>
                            <div>
                                {
                                    user.badges.map((badge, key) => <UserBadge key={key} badge={badge}/>)
                                }
                            </div>
                        </Grid>
                        {user.bots.pages && <Grid item xs={12}>
                            <Typography variant="h5">{user.tag}님이 제작한 봇 목록</Typography>
                            <Grid container spacing={2}>
                                {
                                    user.bots.result.map((it, key) => (
                                        <Grid item xs={12} md={6} lg={4} key={key}>
                                            {JSON.stringify(it)}
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            <Pagination count={user.bots.pages}/>
                        </Grid>}
                    </Grid>
                </>
            })() : '유저를 찾을 수 없습니다'
        }
    </div>
}

export default withRouter(ProfileView);