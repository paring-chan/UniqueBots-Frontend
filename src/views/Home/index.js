import React from 'react';
import Experiment from "../../components/Experiment";
import Original from "./Original";

const HomePage = (props) => {
    return (
        <Experiment experiment="home__infinite_scroll" off={<Original {...props}/>}/>
    );
};

export default HomePage;