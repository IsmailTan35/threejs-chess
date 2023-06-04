import { IPiece } from "./iPiece";

function king(props: IPiece) {
  const { setSquares, location, stones, color } = props;
  setSquares((squares: any) => {
    const [startRow, startCol] = location;
    return squares.map((square: any) => {
      let isTarget = "empty";
      const [targetRow, targetCol] = square.position;

      const isSelected =
        (Math.abs(startRow - targetRow) === 0 &&
          Math.abs(startCol - targetCol) === 1) ||
        (Math.abs(startRow - targetRow) === 1 &&
          Math.abs(startCol - targetCol) === 1) ||
        (Math.abs(startRow - targetRow) === 1 &&
          Math.abs(startCol - targetCol) === 0) ||
        (square.position[0] === startRow && square.position[1] === startCol);

      if (isSelected) {
        console.log(isSelected);
        if (
          square.position[0] === startRow &&
          square.position[1] === startCol
        ) {
          isTarget = "me";
        } else {
          const targetStone = stones.find(
            (stone: any) =>
              stone.position[0] === targetRow && stone.position[1] === targetCol
          );
          if (targetStone) {
            isTarget = targetStone.color === color ? "friendly" : "attack";
          } else {
            isTarget = "empty";
          }
        }
      }

      return {
        ...square,
        isSelected,
        isTarget,
      };
    });
  });
}

export default king;
