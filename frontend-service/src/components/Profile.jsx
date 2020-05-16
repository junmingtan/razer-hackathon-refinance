import React, {Component, useState} from 'react';
import ProgressBar from "./ProgressBar";

const Skill = ({name, icon}) => (
    <div className="skill">

    </div>
)

const Profile = ({level, experience, skills}) => {
    const [progress, setProgress] = useState(80);
    return (<div className="container">
        <div className="level">
            Level {level} Grandmaster
        </div>
        <div className="experience_container" onClick={() => setProgress(Math.random() * 100)}>
            <ProgressBar progress={progress} frontColor="#7BC415FF" backColor="#AEFF0088"/>
        </div>
        <div className="skills_container">

        </div>
    </div>)
}

export default Profile;
