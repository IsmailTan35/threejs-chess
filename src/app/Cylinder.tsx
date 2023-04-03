import { memo, useEffect, useRef, useState } from "react";

function Cylinder(props: any) {
  const meshRef = useRef<any>();
  const [location, setLocation] = useState([0, 0, 0.65]);
  useEffect(() => {
    if (
      props.selected.color === props.color &&
      props.selected.type === props.type &&
      props.selected.id === props.idx
    ) {
      setLocation([
        props.selected.coordinate[0],
        props.selected.coordinate[1],
        0.65,
      ]);
    }
  }, [props.selected.coordinate]);

  useEffect(() => {
    setLocation(props.position);
  }, [props.position]);

  return (
    <mesh
      ref={meshRef}
      rotation={[1.571, 0, 0]}
      position={location}
      scale={0.3}
      onClick={event => {
        if (props.step === props.color) {
          console.log(props.idx);
          props.setSelected({
            id: props.idx,
            color: props.color,
            type: props.type,
            coordinate: location,
          });
        }
      }}
    >
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

export default memo(Cylinder);
