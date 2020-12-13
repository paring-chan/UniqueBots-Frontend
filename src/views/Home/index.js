import React from 'react';
import Experiment from "../../components/Experiment";
import Original from "./Original";
import ExperimentalHome from "./Experimental";

const HomePage = (props) => {
    return (
        <Experiment experiment="home__infinite_scroll" on={<ExperimentalHome {...props}/>} off={<Original {...props}/>}/>
    );
};

export default HomePage;