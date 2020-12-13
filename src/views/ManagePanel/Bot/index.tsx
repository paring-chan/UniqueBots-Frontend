import React, {Component} from 'react';
import loginRequired from "../../../util/loginRequired";
import {
    Button,
    CircularProgress,
    FormControl,
    Grid, InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from "@material-ui/core";
import {gql} from "@apollo/client";
import {apolloClient} from "../../../apollo";
import {withSnackbar} from "notistack";
import {Alert, AlertTitle} from "@material-ui/lab";
import {Link as RouterLink} from 'react-router-dom'
import {Link} from '@material-ui/core'
import {motion} from 'framer-motion'
import {graphql} from "@apollo/react-hoc";

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

class ManageBot extends Component<any, any> {
    state = {
        validate__clientID: '',
        clientID: '',
        brief: '',
        description: '',
        prefix: '',
        invite: '',
        processing: false,
        fetched: false,
        lock: false,
        library: ''
    }

    async submit() {
        const query = gql`
            query ($id: String!, $description: String!, $brief: String!, $prefix: String!, $invite: String!, $lock: Boolean!, $library: String!) {
                me {
                    bot(id: $id) {
                        patch(description: $description, brief: $brief, prefix: $prefix, invite: $invite, lock: $lock, library: $library)
                    }
                }
            }
        `
        let result: any

        try {
            result = await apolloClient.query({
                query,
                variables: {
                    id: this.props.data.me.bot.id,
                    description: this.state.description,
                    brief: this.state.brief,
                    prefix: this.state.prefix,
                    invite: this.state.invite || null,
                    lock: this.state.lock,
                    library: this.state.library
                },
            })
        } catch (e) {
            this.props.enqueueSnackbar(e.message, {
                variant: 'error'
            })
        }

        if (result.data.me?.bot?.patch) {
            this.props.enqueueSnackbar('봇이 성공적으로 수정되었습니다.', {
                variant: 'success'
            })
            this.props.history.push('/manage')
        }
    }

    async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (!this.state.fetched) {
            await this.props.data.refetch({id: this.props.match.params.id})
        }
        if (this.props.data.me?.bot && !this.state.fetched) {
            const b = this.props.data.me.bot
            this.setState({
                fetched: true,
                clientID: b.id,
                brief: b.brief,
                description: b.description,
                invite: b.invite,
                prefix: b.prefix,
                lock: b.locked,
                library: b.library
            })
        }
    }

    validateClId(v: any) {
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
                {
                    this.props.data.loading && !this.props.data.error ?
                        <CircularProgress/> : this.props.data.error ? '에러' : (
                            <>
                                <Typography variant="h4" style={{marginBottom: 20}}>봇 수정하기</Typography>
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
                                            <TextField disabled onChange={e => {
                                                this.setState({clientID: e.target.value})
                                                this.validateClId(e.target.value)
                                            }} error={Boolean(this.state.validate__clientID)} variant="standard"
                                                       label="클라이언트 ID"
                                                       required style={{
                                                width: '100%'
                                            }} value={this.state.clientID}/>
                                        </AnimatedGrid>
                                        <AnimatedGrid variants={itemVariants} item xs={12} md={6}>
                                            <TextField disabled={this.state.processing} variant="standard" label="짧은 설명"
                                                       required style={{
                                                width: '100%'
                                            }} helperText={`${this.state.brief.length}/50`} value={this.state.brief}
                                                       onChange={e => {
                                                           this.setState({brief: e.target.value.slice(0, 50)})
                                                       }}/>
                                        </AnimatedGrid>
                                        <AnimatedGrid item xs={12} md={6} variants={itemVariants}>
                                            <TextField disabled={this.state.processing} variant="standard" label="접두사"
                                                       required style={{
                                                width: '100%'
                                            }} helperText={`${this.state.prefix.length}/5`} value={this.state.prefix}
                                                       onChange={e => {
                                                           this.setState({prefix: e.target.value.slice(0, 5)})
                                                       }}/>
                                        </AnimatedGrid>
                                        <AnimatedGrid item xs={12} md={6} variants={itemVariants}>
                                            <TextField disabled={this.state.processing} variant="standard"
                                                       label="초대링크" required style={{
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
                                            <TextField disabled={this.state.processing} variant="standard"
                                                       label="봇 설명(마크다운 가능)" required style={{
                                                width: '100%'
                                            }} helperText={`${this.state.description.length}/1500`}
                                                       value={this.state.description}
                                                       multiline onChange={e => {
                                                this.setState({description: e.target.value.slice(0, 1500)})
                                            }}/>
                                        </AnimatedGrid>
                                        <AnimatedGrid item variants={itemVariants} xs={12}
                                                      onChange={e => this.setState({lock: (e.target as any).checked})}>
                                            <Switch checked={this.state.lock}/> 봇 잠금처리(잠금처리 하면 봇 초대가 비활성화 됩니다)
                                        </AnimatedGrid>
                                        <AnimatedGrid item variants={itemVariants}>
                                            <Button type="submit">수정하기</Button>
                                        </AnimatedGrid>
                                    </AnimatedGrid>
                                </form>
                            </>
                        )
                }
            </>
        );
    }
}

//@ts-ignore
export default loginRequired(withSnackbar(graphql(gql`
    query ($id: String!) {
        me {
            bot(id: $id) {
                id
                brief
                description
                invite
                prefix
                locked
                library
            }
        }
    }
`, {
    options: {
        variables: {
            id: ''
        }
    }
})(ManageBot)));