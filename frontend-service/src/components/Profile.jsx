import React, {Component, useState} from 'react';
import './Profile.css';

const ProgressBar = ({progress}) => (
    <div className="progress">
        <div className="main" style={{flexGrow: `${progress / 100}`}}>
        </div>
        <div style={{flexGrow: `${1 - (progress / 100)}`}}>
            <div className="row" id="r-one">
                <span className="sq" id="sq-1"/>
                <span className="sq" id="sq-2"/>
                <span className="sq" id="sq-3"/>
            </div>
            <div className="row" id="r-two">
                <span className="sq" id="sq-4"></span>
                <span className="sq" id="sq-5"></span>
                <span className="sq" id="sq-6"></span>
            </div>
            <div className="row" id="r-three">
                <span className="sq" id="sq-7"></span>
                <span className="sq" id="sq-8"></span>
                <span className="sq" id="sq-9"></span>
            </div>
            <div className="row" id="r-four">
                <span className="sq" id="sq-10"></span>
                <span className="sq" id="sq-11"></span>
                <span className="sq" id="sq-12"></span>
            </div>
        </div>
    </div>
)


const Skill = ({name, icon}) => (
    <div className="skill">

    </div>
)

const Profile = ({level, experience, skills}) => {
    const [progress, setProgress] = useState(80);
    return (<div className="profile_container">
        <div className="level">
            Level {level} Grandmaster
        </div>
        <div className="experience_container" onClick={() => setProgress(Math.random() * 100)}>
            <ProgressBar progress={progress}/>
        </div>
        <div className="skills_container">

        </div>
    </div>)
}

export default Profile;
