import ProgressBar from "./ProgressBar";
import React from "react";

const QuestCard = ({quest:{name, exp, progress, criteria}}) => (
    <div className="quest card" key={name}>
        <div className="header">
            <p>{name}</p>
            <p>{exp} EXP</p>
        </div>
        <p className="fulfilled">Completed: {progress} of {criteria}</p>
        <ProgressBar frontColor="#7BC415FF" backColor="#AEFF0088" progress={progress / criteria * 100} />
    </div>
)

export default QuestCard
