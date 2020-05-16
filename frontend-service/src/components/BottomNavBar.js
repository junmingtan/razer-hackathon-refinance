import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import {IoIosHome, IoIosHeart, IoIosCash, IoIosBonfire, IoIosBook} from "react-icons/io"
import "./BottomNavBar.css";

const BottomNavBar = ({active, handleNav}) => (
    <div
        className="nav"
    >
      <div className="nav_item" onClick={() => handleNav("home")}>
        <IoIosHome className={`navicon ${active === "home" ? "active":""}`}/>
        <span className="nav_text">home</span>
      </div>
      <div className="nav_item" onClick={() => handleNav("perks")}>
        <IoIosHeart className={`navicon ${active === "perks" ? "active":""}`}/>
        <span className="nav_text">perks</span>
      </div>
      <div className="nav_item" onClick={() => handleNav("transfer")}>
        <IoIosCash className={`navicon ${active === "transfer" ? "active":""}`}/>
        <span className="nav_text">transfer</span>
      </div>
      <div className="nav_item" onClick={() => handleNav("quest")}>
        <IoIosBonfire className={`navicon ${active === "quest" ? "active":""}`}/>
        <span className="nav_text">quest</span>
      </div>
      <div className="nav_item" onClick={() => handleNav("history")}>
        <IoIosBook className={`navicon ${active === "history" ? "active":""}`}/>
        <span className="nav_text">history</span>
      </div>
    </div>
)

export default BottomNavBar;
