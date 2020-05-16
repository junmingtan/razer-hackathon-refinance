import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ImageCard from "../components/ImageCard";
import { GiLevelTwoAdvanced, GiFamilyHouse } from "react-icons/gi";

import "./SkillTreeModal.css";
import { textAlign } from "@material-ui/system";

export default function SimpleModal({
  handleCloseModal,
  open,
  image,
  userLevel,
  handleUpgrade
}) {
  const body = (
    <div className="skillTreeModal">
      <div>
        <ImageCard active={image.is_active} src={image} />
        <div className="skillTreeModal__level">
          <div>
            <span className="skillTreeModal__level__icon">
              <div style={{ textAlign: "center", display: "inline-block" }}>
                <div>
                  <GiLevelTwoAdvanced />
                  <span className="skillTreeModal__level__minLevel">
                    {image.min_level}
                  </span>
                </div>
                <div style={{ fontSize: "0.4em" }}>minimum level</div>
              </div>
            </span>
          </div>
          <p></p>
        </div>
      </div>
      <h2>{image.title}</h2>
      <p className="skillTreeModal__description">{image.description}</p>
      {!image.is_active ? (
        <Button
          className="skillTreeModal__button"
          variant="contained"
          color="primary"
          disabled={userLevel < image.min_level ? true : false}
          onClick={() => handleUpgrade(image.pid)}
        >
          Upgrade
        </Button>
      ) : (
        ""
      )}
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
