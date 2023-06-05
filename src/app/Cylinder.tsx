import { memo, useEffect, useRef, useState } from "react";
import pieces from "./move/pieces";
import { scales, rotation, positionZ } from "./params";
import { PieceProps } from "./interfaces";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

function Cylinder(props: PieceProps) {
  const {
    setSquares,
    setSelected,
    selected,
    step,
    setStep,
    color,
    stones,
    type,
    position,
    isEnabled,
    idx,
    model,
    setAttributes,
    attributes,
  } = props;

  const meshRef = useRef<any>();
  const [location, setLocation] = useState([0, 0, 1]);
  const [all, rook]: any = useLoader(GLTFLoader, [
    "models/chess_set.glb",
    "models/rook.glb",
  ]);

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
    if (
      selected.color === color &&
      selected.type === type &&
      selected.id === idx
    ) {
      setLocation([
        selected.coordinate[0],
        selected.coordinate[1],
        selected.coordinate[2],
      ]);
    }
  }, [selected.coordinate]);

  useEffect(() => {
    setLocation([position[0], position[1], positionZ[`${type}`]]);
  }, [position]);

  function handleClick() {
    if (color !== step || !isEnabled) return;
    if (selected.id === idx) {
      setSelected({
        id: null,
        color: "",
        type: "",
        coordinate: [null, null, 1],
      });
      return;
    }
    if (step === color) {
      setSelected({
        id: null,
        color: "",
        type: "",
        coordinate: [null, null, 1],
      });
      setTimeout(() => {
        setSelected({
          id: idx,
          color: color,
          type: type,
          coordinate: location,
        });
        setTimeout(() => {
          pieces[type]({
            step,
            color,
            setSquares,
            stones,
            location,
            setAttributes,
            attributes,
            selected: {
              id: idx,
              color: color,
              type: type,
              coordinate: location,
            },
          });
        }, 100);
      }, 100);
    }
  }

  return (
    <>
      <mesh
        ref={meshRef}
        position={[location[0], location[1], location[2]]}
        scale={scales[`${type}`]}
        geometry={model ? models[`${color}`][`${type}`]?.geometry : null}
        material={model ? models[`${color}`][`${type}`]?.material : null}
        onClick={handleClick}
        rotation={[
          rotation[`${color}`][`${type}`][0],
          rotation[`${color}`][`${type}`][1],
          rotation[`${color}`][`${type}`][2],
        ]}
        onPointerOver={e => {
          if (step !== color) return;
          document.getElementsByTagName("html")[0].style.cursor = "pointer";
        }}
        onPointerOut={e => {
          document.getElementsByTagName("html")[0].style.cursor = "default";
        }}
      >
        {!model ? (
          <>
            <cylinderGeometry args={[1, 1, 1, 32]} />
            <meshStandardMaterial color={color} />
          </>
        ) : null}
      </mesh>
    </>
  );
}

export default memo(Cylinder);
