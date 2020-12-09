import React, {Component} from 'react';
import loginRequired from "../../util/loginRequired";
import {Button, Grid, TextField, Typography} from "@material-ui/core";

class AddBotPage extends Component {
    state = {
        validate__clientID: '',
        clientID: '',
        brief: '',
        description: ''
    }

    validate() {
        if (!this.validateClId(this.state.clientID)) {
            return alert('유효한 클라이언트 ID를 입력해주세요')
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
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.validate()
                    
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField onChange={e => {
                                this.setState({clientID: e.target.value})
                                this.validateClId(e.target.value)
                            }} error={Boolean(this.state.validate__clientID)} variant="standard" label="클라이언트 ID"
                                       required style={{
                                width: '100%'
                            }} value={this.state.clientID}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField variant="standard" label="짧은 설명" required style={{
                                width: '100%'
                            }} helperText={`${this.state.brief.length}/50`} value={this.state.brief} onChange={e => {
                                this.setState({brief: e.target.value.slice(0, 50)})
                            }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="standard" label="봇 설명(마크다운 가능)" required style={{
                                width: '100%'
                            }} helperText={`${this.state.description.length}/1500`} value={this.state.description}
                                       multiline onChange={e => {
                                this.setState({description: e.target.value.slice(0, 1500)})
                            }}/>
                        </Grid>
                        <Grid item>
                            <Button type="submit">등록하기</Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    }
}

export default loginRequired(AddBotPage);