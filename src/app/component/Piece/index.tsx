import { memo, useEffect, useRef, useState } from "react";
import pieces from "../../move/pieces";
import { scales, rotation, positionZ } from "../../params";
import { PieceProps } from "../../interfaces";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { initialSelected } from "@/app/initialValues";
import kingCheck from "@/app/move/kingCheck";

function Piece(props: PieceProps) {
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
    squares,
  } = props;

  const meshRef = useRef<any>();
  const [location, setLocation] = useState([0, 0, 1]);
  const [all, rook]: any = useLoader(GLTFLoader, [
    "models/chess_set.glb",
    "models/rook.glb",
  ]);
  const [showModal, setShowModal] = useState(true);
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
    if (type === "pawn") {
      return;
    }
  }, [position, type]);

  const clearSelected = () => {
    setSelected(initialSelected);
  };

  async function handleClick() {
    if (color !== step || !isEnabled) return;
    if (selected.id === idx) {
      clearSelected();
      return;
    }
    if (step === color) {
      clearSelected();
      await new Promise(resolve => setTimeout(resolve, 100));
      const data = {
        id: idx,
        color: color,
        type: type,
        coordinate: location,
      };
      setSelected(data);

      await new Promise(resolve => setTimeout(resolve, 100));
      const pieceProps = {
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
      };
      pieces[type](pieceProps);
    }
  }

  useEffect(() => {
    if (step === color && type === "king") {
      kingCheck({ step, color, setSquares, stones, location, squares });
    }
  }, [step, location, squares, type, stones]);

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

export default memo(Piece);
