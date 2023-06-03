import { IPiece } from "./iPiece";

const rook = (props: IPiece) => {
  const { setSquares, stones, location, color } = props;
  setSquares((square: any) => {
    const stonesPositions = stones.map((item: any) => item.position);
    const [startRow, startCol] = location;
    return square.map((item: any) => {
      let isTarget = null;
      const [targetRow, targetCol] = item.position;

      const isBlocked = stonesPositions.some(([pieceRow, pieceCol, c]: any) => {
        if (startRow === targetRow) {
          return (
            pieceRow === startRow &&
            pieceCol > Math.min(startCol, targetCol) &&
            pieceCol < Math.max(startCol, targetCol)
          );
        } else if (startCol === targetCol) {
          return (
            pieceCol === startCol &&
            pieceRow > Math.min(startRow, targetRow) &&
            pieceRow < Math.max(startRow, targetRow)
          );
        }
        return false;
      });

      const isSelected =
        !isBlocked && (startRow === targetRow || startCol === targetCol);

      if (isSelected) {
        if (item.position[0] === startRow && item.position[1] === startCol) {
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
        ...item,
        isSelected,
        isTarget: isTarget,
      };
    });
  });
};

export default rook;
