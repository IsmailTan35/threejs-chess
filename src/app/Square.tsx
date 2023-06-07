import { useEffect, useRef } from "react";
import { positionZ, squareColors } from "./params";

interface ISquare {
  idx: number;
  selected: any;
  setSelected: any;
  stones: {
    position: number[];
    color: string;
    type: string;
  }[];
  attributes: any;
  setStep: any;
  setStones: any;
  setAttributes: any;
  isSelected: boolean;
  isTarget: "empty" | "attack" | "friendly" | "me" | "king";
  step: "white" | "black";
  position?: number[];
}

function Square(props: ISquare) {
  const {
    selected,
    setSelected,
    setStones,
    idx,
    isSelected,
    setAttributes,
    setStep,
    isTarget,
    attributes,
    step,
  } = props;
  const meshRef = useRef<any>();
  const x = parseInt((idx % 8).toString()[0]);
  const y = parseInt((idx / 8).toString()[0]);

  useEffect(() => {
    if (!isSelected) {
      meshRef.current.color.setHex(
        squareColors[(x + y) % 2 === 0 ? "black" : "white"]
      );
      return;
    } else {
      meshRef.current.color.setHex(squareColors["default"]);
    }
  }, [isSelected, meshRef, x, y]);

  useEffect(() => {
    if (isTarget === "empty" && !isSelected) {
      console.log("first");

      meshRef.current.color.setHex(
        squareColors[(x + y) % 2 === 0 ? "black" : "white"]
      );
      return;
    }

    meshRef.current.color.setHex(squareColors[isTarget || "default"]);
    console.log(squareColors[isTarget]);
  }, [isTarget, isSelected]);

  const handleClick = () => {
    if (selected.id === null || isTarget == "friendly" || isTarget === "king")
      return;
    if (selected.coordinate[0] === x && selected.coordinate[1] === y * -1)
      return;
    if (!isSelected) return;

    setStones((stones: any) => {
      const newPrv = [...stones];
      if (isTarget === "attack") {
        const target = newPrv.find(
          (stone: any) =>
            stone.position[0] === x && stone.position[1] === y * -1
        );
        if (target) {
          const colorCol = {
            white: 1,
            black: 8,
          };
          const capturedLen = attributes[step].captured.length;
          target.position = [
            (capturedLen < 8 ? colorCol[step] : colorCol[step] + 1) *
              (step === "white" ? -1 : 1),
            (capturedLen % 8) * -1,
            target.position[2],
          ];
          setAttributes[step]((prv: any) => ({
            ...prv,
            captured: [...prv.captured, target],
          }));
          target.isEnabled = false;
        }
      }
      newPrv[selected.id].position = [x, -y, selected.coordinate[2]];
      return newPrv;
    });

    setStep((prv: any) => (prv === "white" ? "black" : "white"));
    setTimeout(() => {
      setSelected((prv: any) => ({
        id: null,
        color: "",
        type: "",
        coordinate: [null, null, prv.coordinate[2]],
      }));
    }, 100);
    if (selected.type === "pawn") {
      setAttributes[selected.color]((prv: any) => ({
        ...prv,
        movedPawn: [...prv.movedPawn, selected.id],
      }));
    }
  };

  return (
    <mesh
      scale={[1, 1, 0.01]}
      {...props}
      onPointerOver={event => {
        if (!isSelected) return;
        meshRef.current.color.setHex(squareColors["hover"]);
      }}
      position={[
        parseInt((idx % 8).toString()[0]),
        -(idx / 8).toString()[0],
        0,
      ]}
      onPointerOut={event => {
        if (!isSelected) return;
        meshRef.current.color.setHex(squareColors[isTarget || "default"]);
      }}
      onClick={handleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={meshRef} />
    </mesh>
  );
}

export default Square;
