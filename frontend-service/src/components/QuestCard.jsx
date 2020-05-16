import ProgressBar from "./ProgressBar";
import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import "./QuestCard.css";

const QuestCard = ({quest:{name, exp, progress, criteria}, handleClick}) => {
    return (
    <div className="quest card" key={name} onClick={handleClick}>
        <div className="header">
            <p>{name}</p>
            <p>{exp} EXP</p>
        </div>
        <p className="fulfilled">Completed: {progress} of {criteria}</p>
        <ProgressBar frontColor={progress > 0 ? "#7BC415FF" : "#2c6ec4FF"} backColor={progress > 0 ? "#AEFF0088" : "#A2EEFF88"} progress={progress / criteria * 100} />
    </div>
)}

export const QuestModal = ({open, handleClose, quest, onCollect}) => {
    const {name, exp, progress, criteria, description, completed} = quest
    const available = !completed && progress === criteria;
    return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={open}>
            <div className="modal">
                <div className="modal_title">
                    <h2>{name}</h2>
                </div>
                <div>{description}</div>
                <p>Completed: {progress} of {criteria}</p>
                <ProgressBar frontColor={progress > 0 ? "#7BC415FF" : "#2c6ec4FF"} backColor={progress > 0 ? "#AEFF0088" : "#A2EEFF88"} progress={progress / criteria * 100} />
                <div className={`button ${available ? "available" : ""}`} onClick={() => available ? onCollect(quest) : ""}>{exp} EXP</div>
            </div>
        </Fade>
    </Modal>
)}

export default QuestCard
