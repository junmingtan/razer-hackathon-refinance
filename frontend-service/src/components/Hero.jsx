import React, {useEffect, useRef, useState} from "react";

import "./Hero.css"

let travel;

function calcFadeIn(offsetHeight, bottom) {
    const bar_height = 40
    if (!travel) {
        travel = offsetHeight - bar_height;
    }
    const progress = (travel - (bottom * 2)) / (travel / 2)
    return Math.min(1, progress)
}

const Hero = ({
                  heroContent,
                  navbarContent,
                  backgroundImage="/hero.jpg",
                  topBarStyle={color: "white", backgroundColor:" #463657"}
}) => {
    const ref = useRef()
    useEffect(() => {
        document.onscroll = (e) => {
            const bottom = ref.current.getBoundingClientRect().bottom
            setFadeOut(ref.current.offsetHeight - bottom)
            setFadeIn( calcFadeIn(ref.current.offsetHeight, bottom))
        }
        return () => document.onscroll = null;
    })
    const [fadeOut, setFadeOut] = useState(0);
    const [fadeIn, setFadeIn] = useState(0);
    return (
        <React.Fragment>
        <div
            className="hero"
            ref={ref}
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, ${0.4 + Math.max(0,(fadeOut / 100) * 0.2)}), rgba(0, 0, 0, ${0.8 + Math.max(0 , (fadeOut / 100) * 0.2)})), url("${backgroundImage}")`
            }}>
            {/*<VisaCard />*/}
            <div className="hero-content" style={{marginTop: `${fadeOut}px`, opacity: `${Math.max(0, 1 - (fadeOut / 100))}`}}>
                {heroContent}
            </div>
        </div>
        <div className="top_bar" style={{opacity: `${fadeIn}`, ...topBarStyle}}>
            <div style={{marginLeft: `${20 - (fadeIn - 0.5) * 2 * 10}px`}}>
                {navbarContent}
            </div>
        </div>
        </React.Fragment>
    )
}

export default Hero;
