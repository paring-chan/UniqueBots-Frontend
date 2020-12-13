import React from 'react';
import {connectStore} from "../store";

const Experiment = ({experiments, experiment, on=<></>, off=<></>}) => {
    return (
        experiments.switches[experiment] ? on : off
    );
};

export default connectStore(Experiment)