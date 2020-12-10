import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Link, withRouter} from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import UserBadge from "../../components/UserBadge";
import {Pagination} from "@material-ui/lab";
import classes from './profile.module.scss'
import {Dns} from "@material-ui/icons";
import {motion} from "framer-motion";

const AnimatedGrid = motion.custom(Grid)

function ProfileView({match: {params: {id}}}) {
    const {loading, error, data, refetch} = useQuery(gql`
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
                        avatar
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
                            <AnimatedGrid variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        delayChildren: 0.3,
                                        staggerChildren: 0.1
                                    }
                                }
                            }} container spacing={2} initial="hidden" animate="visible">
                                {
                                    user.bots.result.map((it, key) => (
                                        <AnimatedGrid variants={{
                                            hidden: {
                                                x: 40,
                                                opacity: 0
                                            },
                                            visible: {
                                                x: 0,
                                                opacity: 1
                                            }
                                        }} item xs={6} md={4} lg={2} key={key}>
                                            <Card>
                                                <CardActionArea component={Link} to={`/bots/${it.id}`}>
                                                    <CardMedia image={it.avatar} title={it.tag} style={{
                                                        height: 140
                                                    }}/>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {it.tag}
                                                        </Typography>
                                                        <Chip label={`서버 0개`} style={{pointerEvents: 'none'}}
                                                              icon={<Dns/>}/>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {it.brief}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </AnimatedGrid>
                                    ))
                                }
                            </AnimatedGrid>
                            <Pagination count={user.bots.pages} classes={{
                                ul: classes.ul
                            }} onChange={(e, v) => {
                                return refetch({id, botsPage: v})
                            }
                            }/>
                        </Grid>}
                    </Grid>
                </>
            })() : '유저를 찾을 수 없습니다'
        }
    </div>
}

export default withRouter(ProfileView);