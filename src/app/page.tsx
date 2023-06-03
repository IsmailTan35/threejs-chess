"use client";
import { memo, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import stonesData from "./stones.json";
import Cylinder from "./Cylinder";
import Square from "./Square";

function Areas(props: any) {
  const [selected, setSelected] = useState({
    id: null,
    color: "",
    type: "",
    coordinate: [null, null, 1],
  });
  const [step, setStep] = useState("white");
  const [stones, setStones] = useState(stonesData.data);
  const [whiteAttributes, setWhiteAttributes] = useState({
    movedPawn: [],
    rog: false,
  });
  const [blackAttributes, setBlackAttributes] = useState({
    movedPawn: [],
    rog: false,
  });

  const all: any = useGLTF("models/chess_set.glb");
  const rook: any = useGLTF("models/rook.glb");

  const models = {
    white: {
      pawn: {
        material: all.materials["Chess_White"],
        geometry: all.nodes.Object_4.geometry,
      },
      bishop: {
        material: all.materials["Chess_White"],
        geometry: all.nodes.Object_21.geometry,
      },
      knight: {
        material: all.materials["Chess_White"],
        geometry: all.nodes.Object_81.geometry,
      },
      rook: {
        material: all.materials["Chess_White"],
        geometry: rook.nodes.Tower_Material011_0.geometry,
      },
      queen: {
        material: all.materials["Chess_White"],
        geometry: all.nodes.Object_15.geometry,
      },
      king: {
        material: all.materials["Chess_White"],
        geometry: all.nodes.Object_17.geometry,
      },
    },
    black: {
      pawn: {
        material: all.materials["Material.007"],
        geometry: all.nodes.Object_4.geometry,
      },
      bishop: {
        material: all.materials["Material.007"],
        geometry: all.nodes.Object_21.geometry,
      },
      knight: {
        material: all.materials["Material.007"],
        geometry: all.nodes.Object_81.geometry,
      },
      rook: {
        material: all.materials["Material.007"],
        geometry: rook.nodes.Tower_Material011_0.geometry,
      },
      queen: {
        material: all.materials["Material.007"],
        geometry: all.nodes.Object_15.geometry,
      },
      king: {
        material: all.materials["Material.007"],
        geometry: all.nodes.Object_17.geometry,
      },
    },

    all: {
      material: all.materials["Chess_White"],
      geometry: all.nodes.Object_83.geometry,
    },
  };

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
      {/* <mesh
        material={models.all.material}
        geometry={models.all.geometry}
        scale={1}
        position={[0, 0, 1]}
      /> */}
      {stones.map((stone: any, index: number) => {
        return (
          <Cylinder
            idx={index}
            key={index}
            position={stone.position}
            color={stone.color}
            type={stone.type}
            model={stone.model}
            models={models}
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
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
