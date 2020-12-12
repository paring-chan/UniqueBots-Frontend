import * as React from 'react';
import {gql, graphql} from "@apollo/react-hoc";
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress, Grid,
    Typography
} from "@material-ui/core";
import {Dns} from "@material-ui/icons";
import {Link} from "react-router-dom";
import CustomPagination from "../../components/CustomPagination";
import {motion} from "framer-motion";

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

class ManagePanel extends React.Component<any, any> {
    render() {
        return (
            <div>
                {
                    this.props.data.loading ? '로드중...' : (
                        <div>
                            <Typography variant="h4">봇 관리</Typography>
                            <AnimatedGrid container variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        delayChildren: 0.3,
                                        staggerChildren: 0.05
                                    }
                                }
                            }} spacing={2} initial="hidden" animate="visible">
                                {this.props.data.me.bots.result.map((it: any, key: number) => (
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
                                                    <Button style={{width: '50%'}} component={Link} to={`/manage/bot/${it.id}`}>
                                                        관리하기
                                                    </Button>
                                                    <Button style={{width: '50%'}} component={Link}
                                                            to={`/bots/${it.id}`}>
                                                        더보기
                                                    </Button>
                                                </ButtonGroup>
                                            </CardActions>
                                        </Card>
                                    </AnimatedGrid>
                                ))}
                                <AnimatedGrid xs={12} item>
                                    <CustomPagination count={this.props.data.me.bots.pages} delay={1}
                                                      onChange={(e: any, v: number) => {
                                                          this.props.data.refetch({
                                                              page: v
                                                          })
                                                      }}/>
                                </AnimatedGrid>
                            </AnimatedGrid>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default graphql(gql`
    query ($bot_page: Int!) {
        me {
            id
            bots(page: $bot_page) {
                result {
                    id
                    avatar
                    tag
                    brief
                    guilds
                }
            }
        }
    }
`, {
    options: {
        variables: {
            bot_page: 1
        }
    }
})(ManagePanel)