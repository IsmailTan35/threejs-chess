import { useEffect, useRef } from "react";

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
  position: any;
  isSelected: boolean;
  isTarget: string;
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
  } = props;
  const meshRef = useRef<any>();
  const x = parseInt((idx % 8).toString()[0]);
  const y = parseInt((idx / 8).toString()[0]);

  useEffect(() => {
    // meshRef.current.color.setHex(0x00ff00);
    // meshRef.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
  }, [selected]);

  useEffect(() => {
    if (!isSelected) {
      meshRef.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      return;
    } else {
      meshRef.current.color.setHex(0x00ff00);
    }
  }, [isSelected, meshRef, x, y]);

  useEffect(() => {
    if (!isTarget && !isSelected) {
      meshRef.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      return;
    }

    if (!isTarget) {
      meshRef.current.color.setHex(0x00ff00);
    } else if (isTarget === "attack") {
      meshRef.current.color.setHex(0xff3333);
    } else if (isTarget === "friendly") {
      meshRef.current.color.setHex(0xa9a9a9);
    } else if (isTarget == "me") {
      meshRef.current.color.setHex(0x656565);
    } else {
      meshRef.current.color.setHex(0x00ff00);
    }
  }, [isTarget, isSelected]);

  return (
    <mesh
      scale={[1, 1, 0.01]}
      {...props}
      onPointerOver={event => {
        if (!isSelected) return;
        meshRef.current.color.setHex(0xff3333);
      }}
      onPointerOut={event => {
        if (!isSelected) return;
        if (!isTarget) {
          meshRef.current.color.setHex(0x00ff00);
        } else if (isTarget === "attack") {
          meshRef.current.color.setHex(0xff3333);
        } else if (isTarget === "friendly") {
          meshRef.current.color.setHex(0xa9a9a9);
        } else if (isTarget == "me") {
          meshRef.current.color.setHex(0x656565);
        } else {
          meshRef.current.color.setHex(0x00ff00);
        }
      }}
      onClick={event => {
        if (selected.id === null) return;
        if (selected.coordinate[0] === x && selected.coordinate[1] === y * -1)
          return;
        if (!isSelected) return;
        setStones((prv: any) => {
          const newPrv = [...prv];
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
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={meshRef} />
    </mesh>
  );
}

export default Square;
