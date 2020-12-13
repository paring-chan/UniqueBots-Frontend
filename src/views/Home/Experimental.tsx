import * as React from 'react';
import {gql, useQuery} from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    Avatar, Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress, Grid,
    Typography
} from "@material-ui/core";
import {apolloClient} from "../../apollo";
import {Dns} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

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

const AnimatedGrid = motion.custom(Grid)

const ExperimentalHome = () => {
    const [items, setItems] = React.useState<any>([])
    const [page, setPage] = React.useState(1)
    const [maxPage, setMaxPage] = React.useState(1)

    const q = gql`
        query ($page: Int!) {
            bots(page: $page) {
                pages
                result {
                    id
                    avatar
                    tag
                    guilds
                    invite
                    brief
                }
            }
        }
    `

    const query = useQuery(q, {
        variables: {
            page
        }
    })

    if (query.data?.bots?.result?.length) {
        if (!items.length) {
            let result = []

            for (const bot of query.data.bots.result) {
                result.push(bot)
            }

            setItems(result)
        }
    }

    if (query.data?.bots?.pages && maxPage !== query.data?.bots?.pages) {
        setMaxPage(query.data.bots.pages)
    }

    return (
        <>
            <InfiniteScroll next={async () => {
                const data = await apolloClient.query({
                    query: q,
                    variables: {
                        page: page+1
                    }
                })

                if (data.data.bots?.result?.length) {
                    let result = [...items]

                    for (const bot of data.data.bots.result) {
                        result.push(bot)
                    }

                    setItems(result)
                    setPage(page+1)
                }
            }} hasMore={page < maxPage} loader={<CircularProgress/>} dataLength={items.length} style={{
                overflow: 'hidden'
            }} endMessage={<Typography align="center">
                끝
            </Typography>}>
                <AnimatedGrid container spacing={2}>
                    {items.map((it: any, key: number) => (
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
                </AnimatedGrid>
            </InfiniteScroll>
        </>
    );
};

export default ExperimentalHome;