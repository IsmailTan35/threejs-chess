"use client";
import { memo, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import stonesData from "./stones.json";

import { IAttributes, ISelected, ISquareProps } from "./interfaces";
import {
  initialBlackAttributes,
  initialSelected,
  initialWhiteAttributes,
} from "./initialValues";
import ChessBoard from "./Chessboard";

function Home() {
  const controlsRef = useRef<any>();
  const cameraRef = useRef<any>();

  const handleResetCamera = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    camera.position.set(0, -7, 7);
    controls.target.set(0, 0, 0);
    controls.update();
  };
  const [step, setStep] = useState<"white" | "black">("white");
  const [stones, setStones] = useState(stonesData.data);
  const [whiteAttributes, setWhiteAttributes] = useState<IAttributes>(
    initialWhiteAttributes
  );
  const [blackAttributes, setBlackAttributes] = useState<IAttributes>(
    initialBlackAttributes
  );
  const [selected, setSelected] = useState<ISelected>(initialSelected);
  const createSquare = (idx: number): ISquareProps => {
    return {
      idx,
      position: [
        parseInt((idx % 8).toString()[0]),
        -(idx / 8).toString()[0],
        0,
      ],
      setSelected,
      setStones,
      setStep,
      setAttributes: {
        white: setWhiteAttributes,
        black: setBlackAttributes,
      },
      attributes: {
        white: whiteAttributes,
        black: blackAttributes,
      },
      isSelected: false,
      isTarget: "empty",
      stones,
      selected,
      step,
    };
  };

  const initialSquares: ISquareProps[] = Array.from({ length: 64 }, (_, idx) =>
    createSquare(idx)
  );
  const [squares, setSquares] = useState<ISquareProps[]>(initialSquares);
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
  return (
    <>
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        }}
      >
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
          <div
            style={{
              background: "white",
              color: "black",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "20px",
              width: "max-content",
              cursor: "pointer",
              zIndex: 999,
              userSelect: "none",
            }}
            onClick={handleResetCamera}
          >
            Kamerayı Sıfırla
          </div>
          <div
            style={{
              background: "white",
              color: "black",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "20px",
              width: "max-content",
              cursor: "pointer",
              zIndex: 999,
              userSelect: "none",
            }}
            onClick={handleResetScorboard}
          >
            Hamleleri Sıfırla
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "calc(50vw - 125px)",
            zIndex: 999,
            userSelect: "none",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                background: "white",
                color: "black",
                padding: "10px",
              }}
            >
              Oyun Sırası
            </div>
            <div
              style={{
                background: "white",
                color: "red",
                padding: "10px",
                fontSize: "30px",
                width: "250px",
                marginTop: "10px",
              }}
            >
              {step == "black" ? "Siyah Oyuncu" : "Beyaz Oyuncu"}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 999,
            right: 10,
            top: 10,
            userSelect: "none",
          }}
        >
          <div
            style={{
              background: "white",
              color: "black",
              padding: "10px",
              borderRadius: "3px",
              fontSize: "20px",
              width: "200px",
              textAlign: "center",
            }}
          >
            Kalan Taşlar
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                background: "white",
                color: "black",
                padding: "10px",
                justifyContent: "space-between",
              }}
            >
              <div>Beyaz:</div>
              <div>
                {
                  stones.filter(stone => {
                    return stone.color != "black" && stone.position[0] <= 7;
                  }).length
                }
              </div>
            </div>
            <div
              style={{
                display: "flex",
                background: "white",
                color: "black",
                padding: "10px",
                justifyContent: "space-between",
              }}
            >
              <div>Siyah:</div>
              <div>
                {
                  stones.filter(
                    stone => stone.color != "white" && stone.position[0] >= 0
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
        <Canvas>
          <ambientLight intensity={0.5} />
          <PerspectiveCamera
            makeDefault
            ref={cameraRef}
            position={[0, -7, 7]}
          />
          <pointLight position={[0, 0, 10]} />
          <ChessBoard
            {...{
              step,
              setStep,
              stones,
              setStones,
              whiteAttributes,
              setWhiteAttributes,
              blackAttributes,
              setBlackAttributes,
              selected,
              setSelected,
              squares,
              setSquares,
            }}
          />
          <OrbitControls
            ref={controlsRef}
            minZoom={10}
            maxZoom={10}
            // enableZoom={false}
            enableRotate={false}
            // enableDamping={false}
            // enablePan={false}
          />
        </Canvas>
      </div>
    </>
  );
}

export default memo(Home);
