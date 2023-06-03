"use client";
import { memo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import stonesData from "./stones.json";
import Cylinder from "./Cylinder";
import Square from "./Square";

function Areas(props: any) {
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
  const [selected, setSelected] = useState({
    id: null,
    color: "",
    type: "",
    coordinate: [null, null, 1],
  });
  const [squares, setSquares] = useState(
    Array(64)
      .fill(() => {
        return;
      })
      .map((_, index) => ({
        position: [
          parseInt((index % 8).toString()[0]),
          -(index / 8).toString()[0],
          0,
        ],
        setSelected,
        setStones,
        setStep,
        setAttributes: {
          white: setWhiteAttributes,
          black: setBlackAttributes,
        },
        isSelected: false,
        isTarget: null,
      }))
  );
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

  useEffect(() => {
    if (!selected.id) {
      setSquares(prv =>
        prv.map(item => ({ ...item, isSelected: false, isTarget: null }))
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
              idx={index}
              {...{
                ...item,
                stones,
                selected,
                attributes: {
                  white: whiteAttributes,
                  black: blackAttributes,
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
              model={stone.model}
              models={models}
              {...{
                setSquares,
                setSelected,
                selected,
                step,
                setStep,
                stones,
              }}
            />
          );
        })}
      </mesh>
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
          <ambientLight intensity={0.5} />
          <PerspectiveCamera makeDefault position={[0, -7, 7]} />
          <pointLight position={[0, 0, 10]} />
          <Areas />
          <OrbitControls
            minZoom={10}
            maxZoom={10}
            enableZoom={false}
            enableRotate={false}
            enableDamping={false}
            enablePan={false}
          />
        </Canvas>
      </div>
    </>
  );
}

export default memo(Home);
