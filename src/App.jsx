import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./views/Home";
import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {connectStore} from "./store";

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

class App extends React.Component {
    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.setUser(false)
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default connectStore(App);
