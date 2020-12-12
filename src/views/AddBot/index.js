import React, {Component} from 'react';
import loginRequired from "../../util/loginRequired";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {gql} from "@apollo/client";
import {apolloClient} from "../../apollo";
import {withSnackbar} from "notistack";
import {Alert, AlertTitle} from "@material-ui/lab";
import {Link as RouterLink} from 'react-router-dom'
import {Link} from '@material-ui/core'
import {motion} from 'framer-motion'

const AnimatedGrid = motion.custom(Grid)

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

class AddBotPage extends Component {
    state = {
        validate__clientID: '',
        clientID: '',
        brief: '',
        description: '',
        prefix: '',
        invite: '',
        processing: false,
        library: ''
    }

    async submit() {
        const mutation = gql`
        mutation AddBot($id: String!, $description: String!, $brief: String!, $prefix: String!, $invite: String, $library: String!) {
            addBot(id: $id, description: $description, brief: $brief, prefix: $prefix, invite: $invite, library: $library)
        }
        `
        let result

        try {
            result = await apolloClient.mutate({
                mutation,
                variables: {
                    id: this.state.clientID,
                    description: this.state.description,
                    brief: this.state.brief,
                    prefix: this.state.prefix,
                    invite: this.state.invite || null,
                    library: this.state.library
                },
            })
        } catch(e) {
            this.props.enqueueSnackbar(e.message, {
                variant: 'error'
            })
        }

        if (result.data.addBot) {
            this.props.enqueueSnackbar('봇이 성공적으로 등록되었습니다. 심사 완료 후 리스트에 등록됩니다.', {
                variant: 'success'
            })
            this.props.history.push('/')
        }
    }

    validateClId(v) {
        if (v.length < 17 || v.length > 19 || isNaN(Number(v))) {
            this.setState({validate__clientID: '유효한 아이디를 입력해주세요'})
            return false
        }
        this.setState({validate__clientID: ''})
        return true
    }

    render() {
        return (
            <>
                <Typography variant="h4" style={{marginBottom: 20}}>봇 추가하기</Typography>
                <motion.div variants={{
                    hidden: {
                        opacity: 0,
                        y: 20
                    },
                    visible: {
                        opacity: 1,
                        y: 0
                    }
                }} initial="hidden" animate="visible">
                    <Alert variant="outlined" severity="error">
                        <AlertTitle>봇을 추가하기 전에 꼭 읽어주세요!</AlertTitle>
                        <p><Link to="/discord" component={RouterLink}>디스코드 서버</Link> 에 참가해주세요</p>
                        <p>당신이 개발자임을 확인하기 위해서 개발자 확인 명령어가 필요합니다. {'{접두사}개발자 명령어 또는 도움말에 자신의 태그를 넣어주세요'}</p>
                    </Alert>
                </motion.div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    return this.submit()
                }}>
                    <AnimatedGrid variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.4
                            }
                        }
                    }} initial="hidden" animate="visible" container spacing={2}>
                        <AnimatedGrid variants={itemVariants} item xs={12} md={6}>
                            <TextField disabled={this.state.processing} onChange={e => {
                                this.setState({clientID: e.target.value})
                                this.validateClId(e.target.value)
                            }} error={Boolean(this.state.validate__clientID)} variant="standard" label="클라이언트 ID"
                                       required style={{
                                width: '100%'
                            }} value={this.state.clientID}/>
                        </AnimatedGrid>
                        <AnimatedGrid variants={itemVariants} item xs={12} md={6}>
                            <TextField disabled={this.state.processing} variant="standard" label="짧은 설명" required style={{
                                width: '100%'
                            }} helperText={`${this.state.brief.length}/50`} value={this.state.brief} onChange={e => {
                                this.setState({brief: e.target.value.slice(0, 50)})
                            }}/>
                        </AnimatedGrid>
                        <AnimatedGrid item xs={12} md={6} variants={itemVariants}>
                            <TextField disabled={this.state.processing} variant="standard" label="접두사" required style={{
                                width: '100%'
                            }} helperText={`${this.state.prefix.length}/5`} value={this.state.prefix} onChange={e => {
                                this.setState({prefix: e.target.value.slice(0, 5)})
                            }}/>
                        </AnimatedGrid>
                        <AnimatedGrid item xs={12} md={6} variants={itemVariants}>
                            <TextField disabled={this.state.processing} variant="standard" label="초대링크(비어있을 시 자동 생성됩니다)" style={{
                                width: '100%'
                            }} value={this.state.invite} onChange={e => {
                                this.setState({invite: e.target.value})
                            }}/>
                        </AnimatedGrid>
                        <AnimatedGrid item xs={12} md={6} variants={itemVariants}>
                            <FormControl fullWidth>
                                <InputLabel shrink>
                                    라이브러리
                                </InputLabel>
                                <Select fullWidth value={this.state.library}
                                        onChange={e => this.setState({library: e.target.value})}
                                        disabled={this.state.processing} variant="standard"
                                        required style={{
                                    width: '100%'
                                }}>
                                    {['discord.js',
                                        'eris',
                                        'discord.py',
                                        'discordcr',
                                        'nyxx',
                                        'discord.net',
                                        'DSharpPlus',
                                        'Nostrum',
                                        'coxir',
                                        'discordgo',
                                        'discord4j',
                                        'javacord',
                                        'jda',
                                        'discordia', 'restcord',
                                        'yasmin',
                                        'disco',
                                        'disocrdrb',
                                        'serenity',
                                        'swiftdiscord',
                                        'sword', '기타'].map((it, key) =>
                                        <MenuItem key={key}
                                                  value={it}>{it}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </AnimatedGrid>
                        <AnimatedGrid item xs={12} variants={itemVariants}>
                            <TextField disabled={this.state.processing} variant="standard" label="봇 설명(마크다운 가능)" required style={{
                                width: '100%'
                            }} helperText={`${this.state.description.length}/1500`} value={this.state.description}
                                       multiline onChange={e => {
                                this.setState({description: e.target.value.slice(0, 1500)})
                            }}/>
                        </AnimatedGrid>
                        <AnimatedGrid item variants={itemVariants}>
                            <Button type="submit">등록하기</Button>
                        </AnimatedGrid>
                    </AnimatedGrid>
                </form>
            </>
        );
    }
}

export default loginRequired(withSnackbar(AddBotPage));