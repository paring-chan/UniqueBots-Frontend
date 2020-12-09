import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {withRouter} from "react-router-dom";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import UserBadge from "../../components/UserBadge";

function ProfileView({match: {params: {id}}}) {
    const {loading, error, data} = useQuery(gql`
        query ($id: String!) {
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
            }
        }
    `, {
        variables: {
            id
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
                        <Grid item xs={12}>
                            <Typography>{user.tag}님이 제작한 봇 목록</Typography>
                            <Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            })() : '유저를 찾을 수 없습니다'
        }
    </div>
}

export default withRouter(ProfileView);