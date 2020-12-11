import * as React from 'react';
import {gql, graphql} from "@apollo/react-hoc";
import {Component} from "react";
import {
    Avatar, Button, ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {Dns} from "@material-ui/icons";
import CustomPagination from "../../components/CustomPagination";

const AnimatedGrid = motion.custom(Grid)

const botListAnimation = {
    hidden: {
        y: 20,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1
    },
    exit: {
        opacity: 0,
        x: 20
    }
}

class HomePage extends Component<any, any> {
    componentDidMount() {
        this.props.data.refetch()
    }

    render() {
        return (
            <>
                <Typography variant="h5">봇 랭킹(서버수)</Typography>
                {
                    !this.props.data.loading && this.props.data.bots ? <AnimatedGrid container variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                delayChildren: 0.3,
                                staggerChildren: 0.05
                            }
                        }
                    }} spacing={2} initial="hidden" animate="visible">
                        {this.props.data.bots.result.map((it: any, key: number) => (
                            <AnimatedGrid item xs={12} md={4} lg={3} key={key} variants={botListAnimation}>
                                <Card style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <CardContent style={{
                                        flexGrow: 1
                                    }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <Avatar src={it.avatar}/>
                                            {it.tag}
                                        </Typography>
                                        <Chip label={`서버 ${it.guilds}개`} style={{pointerEvents: 'none'}}
                                              icon={<Dns/>}/>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {it.brief}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <ButtonGroup style={{width: '100%'}}>
                                            <Button style={{width: '50%'}} disabled={it.locked} href={it.invite}
                                                    target="_blank">
                                                초대
                                            </Button>
                                            <Button style={{width: '50%'}} component={Link} to={`/bots/${it.id}`}>
                                                더보기
                                            </Button>
                                        </ButtonGroup>
                                    </CardActions>
                                </Card>
                            </AnimatedGrid>
                        ))}
                        <AnimatedGrid xs={12} item>
                            <CustomPagination count={this.props.data.bots.pages} delay={1}
                                              onChange={(e: any, v: number) => {
                                                  this.props.data.refetch({
                                                      page: v
                                                  })
                                              }}/>
                        </AnimatedGrid>
                    </AnimatedGrid> : <CircularProgress/>
                }
            </>
        );
    }
}

export default graphql(gql`
    query ($page: Int) {
        bots(sort: servers, page: $page) {
            pages
            result {
                id
                avatar
                locked
                tag
                brief
                prefix
                invite
                guilds
            }
        }
    }
`)(HomePage)