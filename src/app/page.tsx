"use client";
import { memo, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import stonesData from "./stones.json";
import Cylinder from "./Cylinder";
import Square from "./Square";
import { IAttributes, ISelected, ISquareProps } from "./interfaces";
import {
  initialBlackAttributes,
  initialSelected,
  initialWhiteAttributes,
} from "./initialValues";

function Areas() {
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

  useEffect(() => {
    setStones(prevStones =>
      prevStones.map(item => ({
        ...item,
        isEnabled: true,
      }))
    );
  }, []);

  useEffect(() => {
    if (!selected.id) {
      setSquares(prevSquares =>
        prevSquares.map(item => ({
          ...item,
          isSelected: false,
          isTarget: "empty",
        }))
      );
    }
  }, [selected]);

  return (
    <>
      <mesh position={[-3.5, 3.5, 0]}>
        {squares.map((item, index) => {
          return (
            <Square
              key={index}
              {...{
                ...item,
                stones,
                selected,
                attributes: {
                  white: whiteAttributes,
                  black: blackAttributes,
                },
                step,
              }}
            />
          );
        })}
        {stones.map((stone: any, index: number) => {
          return (
            <Cylinder
              idx={index}
              key={index}
              position={stone.position}
              color={stone.color}
              type={stone.type}
              model={stone.model}
              {...{
                setSquares,
                setSelected,
                selected,
                step,
                setStep,
                stones,
                isEnabled: stone.isEnabled,
                setAttributes: {
                  white: setWhiteAttributes,
                  black: setBlackAttributes,
                },
                attributes: {
                  white: whiteAttributes,
                  black: blackAttributes,
                },
              }}
            />
          );
        })}
      </mesh>
    </>
  );
}

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
          }}
        >
          <div
            style={{
              position: "absolute",
              background: "white",
              color: "black",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "20px",
              width: "max-content",
              cursor: "pointer",
              zIndex: 999,
            }}
            onClick={handleResetCamera}
          >
            Kamerayı Sıfırla
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
          <Areas />
          <OrbitControls
            ref={controlsRef}
            minZoom={10}
            maxZoom={10}
            // enableZoom={false}
            // enableRotate={false}
            // enableDamping={false}
            // enablePan={false}
          />
        </Canvas>
      </div>
    </>
  );
}

export default memo(Home);
