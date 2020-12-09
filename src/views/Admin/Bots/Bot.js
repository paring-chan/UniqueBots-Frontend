import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Divider} from "@material-ui/core";
import GREEN from "@material-ui/core/colors/green";
import RED from "@material-ui/core/colors/red";
import {Link} from "react-router-dom";

const Bot = ({bot, judge}) => {
    return (
        <Card>
            <CardHeader title={bot.tag || bot.id}/>
            <Divider/>
            <CardContent>
                {bot.brief}
            </CardContent>
            <Divider/>
            <CardActions>
                {!bot.approved ? (
                    judge && <>
                        <Button variant="outlined" style={{
                            color: GREEN["500"],
                            borderColor: GREEN["500"]
                        }}>
                            승인
                        </Button>
                        <Button variant="outlined" style={{
                            color: RED["500"],
                            borderColor: RED["500"]
                        }}>
                            거부
                        </Button>
                    </>
                ) : <>
                    <Button variant="outlined" style={{
                        color: GREEN["500"],
                        borderColor: GREEN["500"]
                    }} component={Link} to={`/bots/${bot.id}`}>
                        상세정보
                    </Button>
                </>}
                <Button variant="outlined" style={{
                    color: RED["500"],
                    borderColor: RED["500"]
                }}>
                    삭제
                </Button>
            </CardActions>
        </Card>
    );
};

export default Bot;