import { useGLTF } from "@react-three/drei";
import { memo, Suspense, useEffect, useRef, useState } from "react";

const scales = {
  pawn: 0.04,
  queen: 0.06,
  king: 0.05,
  bishop: 0.05,
  rook: 0.25,
  knight: 0.4,
};

const rotation = {
  white: {
    pawn: [0, 1.6, 0],
    queen: [0, 1.6, 0],
    king: [0, 1.6, 0],
    bishop: [0, 1.6, 0],
    rook: [0, 0, 0],
    knight: [0, 3.15, 0],
  },
  black: {
    pawn: [0, 1.6, 0],
    queen: [0, 1.6, 0],
    king: [0, 1.6, 0],
    bishop: [0, 1.6, 0],
    rook: [0, 0, 0],
    knight: [0, 3.15, 3.2],
  },
};

const positionZ = {
  pawn: 0.26,
  queen: 0.59,
  king: 0.64,
  bishop: 0.48,
  rook: 0.03,
  knight: 0.45,
};

function Cylinder(props: any) {
  const meshRef = useRef<any>();
  const [location, setLocation] = useState([0, 0, 1]);

  useEffect(() => {
    if (
      props.selected.color === props.color &&
      props.selected.type === props.type &&
      props.selected.id === props.idx
    ) {
      setLocation([
        props.selected.coordinate[0],
        props.selected.coordinate[1],
        props.selected.coordinate[2],
      ]);
    }
  }, [props.selected.coordinate]);

  useEffect(() => {
    setLocation([
      props.position[0],
      props.position[1],
      positionZ[`${props.type}`],
    ]);
  }, [props.position]);

  useEffect(() => {
    if (!meshRef) return;
    meshRef.current.geometry;
  }, [props.model, meshRef]);

  function handleClick() {
    if (props.selected.id === props.idx) {
      props.setSelected({
        id: null,
        color: "",
        type: "",
        coordinate: [null, null, 1],
      });
      return;
    }
    if (props.step === props.color) {
      props.setSelected({
        id: null,
        color: "",
        type: "",
        coordinate: [null, null, 1],
      });
      setTimeout(() => {
        props.setSelected({
          id: props.idx,
          color: props.color,
          type: props.type,
          coordinate: location,
        });
      }, 100);
    }
  }

  return (
    <>
      <mesh
        ref={meshRef}
        position={location}
        scale={scales[`${props.type}`]}
        geometry={
          props.model
            ? props.models[`${props.color}`][`${props.type}`]?.geometry
            : null
        }
        material={
          props.model
            ? props.models[`${props.color}`][`${props.type}`]?.material
            : null
        }
        onClick={handleClick}
        rotation={rotation[`${props.color}`][`${props.type}`]}
        onPointerOver={e => {
          if (props.step !== props.color) return;
          document.getElementsByTagName("html")[0].style.cursor = "pointer";
        }}
        onPointerOut={e => {
          document.getElementsByTagName("html")[0].style.cursor = "default";
        }}
      >
        {!props.model ? (
          <>
            <cylinderGeometry args={[1, 1, 1, 32]} />
            <meshStandardMaterial color={props.color} />
          </>
        ) : null}
      </mesh>
    </>
  );
}

export default memo(Cylinder);
