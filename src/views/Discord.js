import React, {Component} from 'react';
import config from "../config";

class Discord extends Component {
    componentDidMount() {
        window.open(config.discord)
        this.props.history.goBack()
    }

    render() {
        return null
    }
}

export default Discord;