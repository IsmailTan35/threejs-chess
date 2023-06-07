import { useEffect } from "react";
import Cylinder from "./cylinder";
import Square from "./square";
import { IChessBoardProps } from "./interfaces";

function ChessBoard(props: IChessBoardProps) {
  const {
    step,
    setStep,
    stones,
    setStones,
    selected,
    setSquares,
    squares,
    setSelected,
    setWhiteAttributes,
    blackAttributes,
    whiteAttributes,
    setBlackAttributes,
  } = props;

  useEffect(() => {
    setStones((prevStones: any) =>
      prevStones.map((item: any) => ({
        ...item,
        isEnabled: true,
      }))
    );
  }, []);

  useEffect(() => {
    if (!selected.id) {
      setSquares((prevSquares: any) =>
        prevSquares.map((item: any) => ({
          ...item,
          isSelected: false,
          isTarget: "empty",
        }))
      );
    }
  }, [selected]);

  return (
    <>
      <mesh position={[-3.5, 3.5, 0]}>
        {squares.map((item: any, index: number) => {
          return (
            <Square
              key={index}
              {...{
                ...item,
                stones,
                selected,
                attributes: {
                  white: whiteAttributes,
                  black: blackAttributes,
                },
                step,
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
              {...{
                setSquares,
                setSelected,
                selected,
                step,
                setStep,
                stones,
                isEnabled: stone.isEnabled,
                setAttributes: {
                  white: setWhiteAttributes,
                  black: setBlackAttributes,
                },
                attributes: {
                  white: whiteAttributes,
                  black: blackAttributes,
                },
              }}
            />
          );
        })}
      </mesh>
    </>
  );
}

export default ChessBoard;
