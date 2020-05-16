import React from "react";
import {pickHex} from "../utils"

import "./ProgressBar.css"

const ProgressBar = ({progress, frontColor, backColor}) => {
    const fades = [0, 0.1, 0.3, 0.6, 0.7, 0.9, 1].map((w) => pickHex(backColor, frontColor, w));
    return <ProgressBarInner progress={progress} fades={fades} />
}

const ProgressBarInner = ({progress, fades}) => {
    return (
    <div className="progress" style={{backgroundColor: fades[6]}}>
        <div className="main" style={{backgroundColor: fades[0], flexGrow: `${progress / 100}`}}>
        </div>
        {progress !== 100 ? <div style={{flexGrow: `${1 - (progress / 100)}`}}>
            <div className="row" id="r-one">
                <span className="sq" style={{backgroundColor: fades[3]}}/>
                <span className="sq" style={{backgroundColor: fades[5]}}/>
                <span className="sq" style={{backgroundColor: fades[6]}}/>
            </div>
            <div className="row" id="r-two">
                <span className="sq" style={{backgroundColor: fades[2]}}></span>
                <span className="sq" style={{backgroundColor: fades[3]}}></span>
                <span className="sq" style={{backgroundColor: fades[5]}}></span>
            </div>
            <div className="row" id="r-three">
                <span className="sq" style={{backgroundColor: fades[1]}}></span>
                <span className="sq" style={{backgroundColor: fades[2]}}></span>
                <span className="sq" style={{backgroundColor: fades[3]}}></span>
            </div>
            <div className="row" id="r-four">
                <span className="sq" style={{backgroundColor: fades[1]}}></span>
                <span className="sq" style={{backgroundColor: fades[1]}}></span>
                <span className="sq" style={{backgroundColor: fades[2]}}></span>
            </div>
        </div> : ""}

    </div>
)}

export default ProgressBar;
