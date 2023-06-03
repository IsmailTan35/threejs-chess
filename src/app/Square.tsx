import { memo, useEffect, useRef, useState } from "react";
import King from "./move/king";
import Knight from "./move/knight";
import Pawn from "./move/pawn";

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
}
function isPointBetweenPoints(
  x1: any,
  y1: any,
  x2: any,
  y2: any,
  x3: any,
  y3: any
) {
  // Üçüncü noktanın doğru üzerinde olup olmadığını kontrol et
  if (
    x1 === x2 &&
    x1 === x3 &&
    ((y1 <= y3 && y3 <= y2) || (y2 <= y3 && y3 <= y1))
  ) {
    return true;
  }

  return false;
}

function Square(props: ISquare) {
  const { selected, setSelected, stones } = props;
  const meshRef = useRef<any>();
  const [active, setActive] = useState(false);
  const x = parseInt((props.idx % 8).toString()[0]);
  const y = parseInt((props.idx / 8).toString()[0]);

  useEffect(() => {
    setActive(false);
    if (
      props.selected.coordinate[0] !== null &&
      props.selected.coordinate[1] !== null &&
      props.selected.coordinate[0] === x &&
      props.selected.coordinate[1] === -y
    ) {
      meshRef.current.color.setHex(0x00ff00);
      return;
    }
    if (props.selected.type === "king") {
      King({
        x,
        y,
        selected,
        stones,
        setActive,
        ref: meshRef,
        attributes: props.attributes,
        stone: undefined,
      });
    } else if (props.selected.type === "queen") {
      const dx = Math.abs(props.selected.coordinate[0] - x);
      const dy = Math.abs(props.selected.coordinate[1] + y);

      if (
        dx === dy ||
        props.selected.coordinate[0] === x ||
        props.selected.coordinate[1] === -y
      ) {
        meshRef.current.color.setHex(0x00ff00);
        setActive(true);
      } else {
        meshRef.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
        setActive(false);
      }
    } else if (props.selected.type === "bishop") {
      const dx = Math.abs(props.selected.coordinate[0] - x);
      const dy = Math.abs(props.selected.coordinate[1] + y);

      if (dx === dy) {
        meshRef.current.color.setHex(0x00ff00);
        setActive(true);
      } else {
        meshRef.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
        setActive(false);
      }
    } else if (props.selected.type === "rook") {
      const horizontalMove = stones.filter(
        (stone: any) => selected.coordinate[1] === stone.position[1]
      );

      const verticalMove = stones.filter(
        (stone: any) => selected.coordinate[0] === stone.position[0]
      );

      let horizontalCheck = null;
      let horizontalCheckSecond = null;
      let verticalCheck = null;
      let verticalCheckSecond = null;
      let horizontalZero = null;
      let verticalZero = null;

      verticalMove.map((stone: any) => {
        if (stone.position[0] !== x) return;
        meshRef.current.color.setHex(0x00ff00);

        const dx = Math.abs(props.selected.coordinate[0] - stone.position[0]);
        const dx1 = Math.abs(props.selected.coordinate[0] - x);
        if (dx < dx1) {
          // meshRef.current.color.setHex(0x00ff00);
        }
      });
      verticalMove.map((stone: any) => {
        if (stone.position[1] === 0) {
          verticalZero = true;
        }
      });

      if (verticalMove.length > 1) {
        verticalCheck = isPointBetweenPoints(
          verticalMove[0].position[0],
          verticalMove[0].position[1],
          verticalMove[1].position[0],
          verticalMove[1].position[1],
          x,
          -y
        );
      }

      if (
        verticalMove.length > 2 &&
        verticalMove[2].position[0] > verticalMove[0].position[0]
      ) {
        verticalCheckSecond = isPointBetweenPoints(
          verticalMove[0].position[0],
          verticalMove[0].position[1],
          verticalMove[2].position[0],
          verticalMove[2].position[1],
          x,
          -y
        );
      }
      if (horizontalMove.length > 1) {
        horizontalCheck = isPointBetweenPoints(
          horizontalMove[0].position[1],
          horizontalMove[0].position[0],
          horizontalMove[1].position[1],
          horizontalMove[1].position[0],
          -y,
          x
        );
      }
      if (
        horizontalMove.length > 2 &&
        horizontalMove[2].position[0] < horizontalMove[0].position[0]
      ) {
        horizontalCheckSecond = isPointBetweenPoints(
          horizontalMove[0].position[1],
          horizontalMove[0].position[0],
          horizontalMove[2].position[1],
          horizontalMove[2].position[0],
          -y,
          x
        );
      }
      // if (selected.coordinate[0] === x || selected.coordinate[1] === -y) {
      //   meshRef.current.color.setHex(0x00ff00);
      //   setActive(true);
      // }
      // if (
      //   verticalCheck ||
      //   horizontalCheck ||
      //   verticalCheckSecond ||
      //   horizontalCheckSecond
      // ) {
      //   meshRef.current.color.setHex(0x00ff00);
      //   setActive(true);
      //   return;
      // } else {
      //   if (selected.coordinate[0] === x || selected.coordinate[1] === -y) {
      //     meshRef.current.color.setHex(0x00ff00);
      //     setActive(true);
      //   } else {
      //     meshRef.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      //     setActive(false);
      //   }
      // }
    } else if (props.selected.type === "pawn") {
      Pawn({
        x,
        y,
        selected,
        stones,
        setActive,
        ref: meshRef,
        attributes: props.attributes,
        stone: undefined,
      });
    } else if (props.selected.type === "knight") {
      Knight({
        x,
        y,
        selected,
        stones,
        setActive,
        ref: meshRef,
        attributes: props.attributes,
        stone: undefined,
      });
    } else {
      meshRef.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      setActive(false);
    }
  }, [selected]);

  return (
    <mesh
      scale={[1, 1, 0.01]}
      {...props}
      onPointerOver={event => {
        if (!active) return;
        meshRef.current.color.setHex(0xff3333);
      }}
      onPointerOut={event => {
        if (!active) return;
        meshRef.current.color.setHex(0x00ff00);
      }}
      onClick={event => {
        if (
          props.selected.type === "" ||
          (props.selected.coordinate[0] === x &&
            props.selected.coordinate[1] === -y) ||
          !active
        )
          return;
        props.setStones((prv: any) => {
          const newPrv = [...prv];

          newPrv[props.selected.id].position = [
            x,
            -y,
            props.selected.coordinate[2],
          ];
          return newPrv;
        });

        // props.setStep((prv: any) => (prv === "white" ? "black" : "white"));
        setTimeout(() => {
          props.setSelected(prv => ({
            id: null,
            color: "",
            type: "",
            coordinate: [null, null, prv.coordinate[2]],
          }));
        }, 100);
        if (props.selected.type === "pawn") {
          props.setAttributes[props.selected.color]((prv: any) => ({
            ...prv,
            movedPawn: [...prv.movedPawn, props.selected.id],
          }));
        }
      }}
    >
      <boxGeometry args={[1, 1, 1]} scale={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial ref={meshRef} />
    </mesh>
  );
}

export default memo(Square);
