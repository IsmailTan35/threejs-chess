import { IPiece } from "./iPiece";

const kingCheck = (props: IPiece): boolean => {
  const { stones, location, color, squares } = props;
  const filteredStones = stones.filter((stone: any) => stone.color !== color);
  // sah taşının çevresindeki kareleri bul
  const [row, col] = location;
  const aroundSquares = squares.filter(
    (square: any) =>
      Math.abs(square.position[0] - row) <= 1 &&
      Math.abs(square.position[1] - col) <= 1 &&
      (square.position[0] !== row || square.position[1] !== col)
  );

  return false;
};

export default kingCheck;
