import React, {Component} from 'react';
import {
    AppBar,
    Dialog,
    FormControlLabel, List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    Slide,
    Switch,
    Toolbar,
    Typography
} from "@material-ui/core";
import {connectStore} from "../store";

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props}/>
})

const experiments = [
    {
        name: 'Home - Infinite Scroll',
        desc: '홈에서 무한 스크롤을 사용합니다',
        value: 'home__infinite_scroll'
    }
]

class ExperimentsDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.open} fullScreen TransitionComponent={Transition}>
                <AppBar color="primary" style={{boxShadow: 'none'}} position="relative">
                    <Toolbar>
                        <Typography variant="h6">Experiments</Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {
                        experiments.map((it, key) => (
                            <ListItem key={key}>
                                <ListItemText primary={it.name} secondary={it.desc}/>
                                <ListItemSecondaryAction>
                                    <Switch checked={Boolean(this.props.experiments.switches[it.value])} onChange={(e) => {
                                        this.props.setExperiments({[it.value]: e.target.checked})
                                    }}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
            </Dialog>
        );
    }
}

export default connectStore(ExperimentsDialog);