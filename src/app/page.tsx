"use client";
import { memo, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { data } from "./stones.json";
import Cylinder from "./Cylinder";
import Square from "./Square";

function Areas(props: any) {
  const [coordinate, setCoordinate] = useState([0, 0, 0.65]);
  const [selected, setSelected] = useState({
    id: null,
    color: "",
    type: "",
    coordinate: [0, 0, 0.65],
  });
  const [step, setStep] = useState("white");
  const [stones, setStones] = useState(data);
  const [whiteAttributes, setWhiteAttributes] = useState({
    movedPiyon: [],
    rog: false,
  });
  const [blackAttributes, setBlackAttributes] = useState({
    movedPiyon: [],
    rog: false,
  });
  return (
    <>
      {Array(64)
        .fill()
        .map((_, index) => {
          return (
            <Square
              key={index}
              idx={index}
              position={[
                parseInt((index % 8).toString()[0]),
                -(index / 8).toString()[0],
                0,
              ]}
              {...{
                selected,
                setSelected,
                setStones,
                stones,
                setStep,
                attributes: {
                  white: whiteAttributes,
                  black: blackAttributes,
                },
                setAttributes: {
                  white: setWhiteAttributes,
                  black: setBlackAttributes,
                },
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
            {...{
              setSelected,
              selected,
              step,
              setStep,
            }}
          />
        );
      })}
    </>
  );
}

function Home() {
  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
      >
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Areas />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default memo(Home);
