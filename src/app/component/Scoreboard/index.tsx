import React from "react";
import { IAttributes } from "../../interfaces";
import {
  initialBlackAttributes,
  initialSelected,
  initialWhiteAttributes,
} from "../../initialValues";
import stonesData from "../../stones.json";
import "../../assets/css/scoreboard.css";

interface IProps {
  step: "white" | "black";
  stones: any;
  whiteAttributes: IAttributes;
  blackAttributes: IAttributes;
  cameraRef: any;
  controlsRef: any;
  setStones: any;
  setStep: any;
  setWhiteAttributes: any;
  setBlackAttributes: any;
  setSelected: any;
  setSquares: any;
  squares: any;
  selected: any;
  initialSquares: any;
}

const ScoreBoard = (props: IProps) => {
  const {
    step,
    stones,
    cameraRef,
    controlsRef,
    setStones,
    setStep,
    setWhiteAttributes,
    setBlackAttributes,
    setSelected,
    setSquares,
    squares,
    selected,
    whiteAttributes,
    blackAttributes,
    initialSquares,
  } = props;
  const handleResetScorboard = () => {
    setStones(
      stonesData.data.map((item: any) => ({
        ...item,
        isEnabled: true,
      }))
    );
    setStep("white");
    setWhiteAttributes(initialWhiteAttributes);
    setBlackAttributes(initialBlackAttributes);
    setSelected(initialSelected);
    setSquares(initialSquares);
  };

  const handleResetCamera = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
      camera.position.set(0, -7, 20);
    } else {
      camera.position.set(0, -7, 7);
    }
    controls.target.set(0, 0, 0);
    controls.update();
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          top: "10px",
          left: "10px",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div className="camera-reset" onClick={handleResetCamera}>
          Kamerayı Sıfırla
        </div>
        <div className="move-reset" onClick={handleResetScorboard}>
          Hamleleri Sıfırla
        </div>
      </div>
      <div className="game-turn">
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          <div className="game-turn-title">Oyun Sırası</div>
          <div className="game-turn-player">
            {step == "black" ? "Siyah Oyuncu" : "Beyaz Oyuncu"}
          </div>
        </div>
      </div>

      <div className="remaining-stones">
        <div className="remaining-stones-title">Kalan Taşlar</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <div className="remaining-stones-white">
            <div>Beyaz:</div>
            <div>
              {
                stones.filter((stone: any) => {
                  return stone.color != "black" && stone.position[0] <= 7;
                }).length
              }
            </div>
          </div>
          <div className="remaining-stones-black">
            <div>Siyah:</div>
            <div>
              {
                stones.filter(
                  (stone: any) =>
                    stone.color != "white" && stone.position[0] >= 0
                ).length
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
