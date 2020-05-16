import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ImageCard from "../components/ImageCard";
import { GiLevelTwoAdvanced } from "react-icons/gi";

import "./SkillTreeModal.css";

export default function SimpleModal({ handleCloseModal, open, image }) {
  const body = (
    <div className="skillTreeModal">
      <div>
        <ImageCard active={image.is_active} src={image} />
        <div className="skillTreeModal__level">
          <p>
            <span className="skillTreeModal__level__icon">
              <GiLevelTwoAdvanced />
            </span>
            <span className="skillTreeModal__level__minLevel">
              {image.min_level}
            </span>
          </p>
          <p></p>
        </div>
      </div>

      <h2>{image.title}</h2>
      <p className="skillTreeModal__description">{image.description}</p>
      {/* <button
        className="skillTreeModal__button"
        variant="contained"
        color="primary"
      >
        Upgrade
      </button> */}
    </div>
  );

  return (
    <div>
      <Modal open={open} onClose={handleCloseModal}>
        {body}
      </Modal>
    </div>
  );
}
