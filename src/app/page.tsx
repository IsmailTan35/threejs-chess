"use client";
import { memo, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import stonesData from "./stones.json";

import { IAttributes, ISelected, ISquareProps } from "./interfaces";
import {
  initialBlackAttributes,
  initialSelected,
  initialWhiteAttributes,
} from "./initialValues";
import Chessboard from "./component/Chessboard";
import Loading from "./loading";
import Scoreboard from "./component/Scoreboard";
import ChangePiece from "./component/ChangePiece";
function Home() {
  const controlsRef = useRef<any>();
  const cameraRef = useRef<any>();
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

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    const camera = cameraRef.current;
    if (!camera) return;
    if (screenWidth <= 600) {
      camera.position.set(0, -7, 20);
    } else {
      camera.position.set(0, -7, 7);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [cameraRef]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        }}
      >
        <Scoreboard
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
            initialSquares,
            cameraRef,
            controlsRef,
          }}
        />
        <Loading />
        <Canvas>
          <ambientLight intensity={0.5} />
          <PerspectiveCamera
            makeDefault
            ref={cameraRef}
            position={[0, -7, 7]}
          />
          <pointLight position={[0, 0, 10]} />
          <Chessboard
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
