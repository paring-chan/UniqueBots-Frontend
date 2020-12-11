import React, {Component} from 'react';
import {gql, graphql} from "@apollo/react-hoc";
import {CircularProgress, Grid, Paper, Typography, withStyles} from "@material-ui/core";
import markdownIt from 'markdown-it'

const md = markdownIt({
    html: false
})

class BotInfo extends Component {
    state = {
        description: null
    }

    componentDidMount() {
        this.props.data.refetch({
            id: this.props.match.params.id
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.description) {
            if (this.props.data.bot) {
                this.setState({
                    description: md.render(this.props.data.bot.description)
                })
            }
        }
    }

    render() {
        const {classes} = this.props

        let bot = this.props.data.bot

        return (
            <div>
                {
                    !this.props.data.loading && bot ? (
                        <Grid container spacing={2}>
                            <Grid className={classes.avatar} item xs={12} md={6}>
                                <img src={bot.avatar} alt="avatar" width={250} height={250}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className={classes.textMdCenter} variant="h4">{bot.tag}</Typography>
                                <Typography className={classes.textMdCenter} variant="h6">{bot.brief}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper style={{padding: 10}}>
                                    <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.state.description || 'Compiling..'}}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : this.props.data.loading ? <CircularProgress/> : '봇을 찾을 수 없습니다'
                }
            </div>
        );
    }
}

export default graphql(gql`
query ($id: String!) {
    bot(id: $id) {
        avatar
        brief
        description
        guilds
        id
        id
        locked
        prefix
        status
        tag
    }
}
`, {
    options: {
        variables: {
            id: ''
        }
    }
})(withStyles(theme => ({
    avatar: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
        justifyContent: 'flex-end'
    },
    textMdCenter: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        }
    }
}))(BotInfo))