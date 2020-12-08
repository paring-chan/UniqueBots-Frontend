import React, {Component} from 'react';
import AdminLayout from "../../../components/AdminLayout";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import adminOnly from "../../../util/adminOnly";

class ManageBots extends Component {
    render() {
        const bots = [
            {
                id: '123123123',
                brief: '테스트입니다',
                approved: false
            },
            {
                id: '1231231234',
                brief: '테스트2',
                approved: true
            }
        ]

        return (
            <AdminLayout>
                <Typography variant="h6">
                    봇 관리
                </Typography>
                <Typography variant="body2">
                    등록된 봇을 조회/관리 할 수 있습니다.
                </Typography>
                <Grid container spacing={1} style={{
                    padding: 10
                }}>
                    {bots.map(bot => (
                        <Grid item xs={12} md={6} lg={4}>
                            <Card>
                                <CardContent>
                                    {JSON.stringify(bot)}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </AdminLayout>
        );
    }
}

export default adminOnly(ManageBots);