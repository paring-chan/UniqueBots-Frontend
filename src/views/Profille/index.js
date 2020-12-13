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
    Typography, withStyles
} from "@material-ui/core";
import UserBadge from "../../components/UserBadge";
import {Pagination} from "@material-ui/lab";
import styles from './profile.module.scss'
import {Dns} from "@material-ui/icons";
import {motion} from "framer-motion";

const AnimatedGrid = motion.custom(Grid)
const AnimatedTypography = motion.custom(Typography)

function ProfileView({match: {params: {id}}, classes}) {
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
                        guilds
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
                    <AnimatedGrid variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                delayChildren: 0.3,
                                staggerChildren: 0.1
                            }
                        }
                    }} initial="hidden" animate="visible" container spacing={2}>
                        <AnimatedGrid variants={{
                            hidden: {
                                y: 40,
                                opacity: 0
                            },
                            visible: {
                                y: 0,
                                opacity: 1
                            }
                        }} item xs={12} md={6} className={classes.profileImageArea}>
                            <img src={user.avatarURL} alt="Profile Image" width={250} height={250}/>
                        </AnimatedGrid>
                        <AnimatedGrid className={classes.profileArea} variants={{
                            hidden: {
                                x: 40,
                                opacity: 0
                            },
                            visible: {
                                x: 0,
                                opacity: 1
                            }
                        }} item xs={12} md={6}>
                            <Typography variant="h4">{user.tag}</Typography>
                            <motion.div variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        delayChildren: 0.3,
                                        staggerChildren: 0.1
                                    }
                                }
                            }
                            }>
                                {
                                    user.badges.map((badge, key) => <UserBadge key={key} badge={badge}/>)
                                }
                            </motion.div>
                        </AnimatedGrid>
                        {user.bots.pages && <Grid item xs={12}>
                            <AnimatedTypography variants={{
                                hidden: {
                                    opacity: 0
                                },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        delay: 0.5
                                    }
                                }
                            }} variant="h5" initial="hidden" animate="visible">{user.tag}님이 제작한 봇 목록</AnimatedTypography>
                            <AnimatedGrid variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        delayChildren: 1,
                                        staggerChildren: 0.1
                                    }
                                }
                            }} container spacing={2} initial="hidden" animate="visible">
                                {
                                    user.bots.result.map((it, key) => (
                                        <AnimatedGrid variants={{
                                            hidden: {
                                                y: 40,
                                                opacity: 0
                                            },
                                            visible: {
                                                y: 0,
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
                                                        <Chip label={`서버 ${it.guilds}개`} style={{pointerEvents: 'none'}}
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
                            <motion.div variants={{
                                hidden: {
                                    opacity: 0
                                },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        delay: 1.25
                                    }
                                }
                            }} initial="hidden" animate="visible">
                                <Pagination count={user.bots.pages} classes={{
                                    ul: styles.ul
                                }} style={{
                                    marginTop: 10
                                }} onChange={(e, v) => {
                                    return refetch({id, botsPage: v})}
                                }/>
                            </motion.div>
                        </Grid>}
                    </AnimatedGrid>
                </>
            })() : '유저를 찾을 수 없습니다'
        }
    </div>
}

export default withStyles(theme => ({
    profileArea: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'left'
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    profileImageArea: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    }
}))(withRouter(ProfileView));