import { IPiece } from "./iPiece";

const bishop = (props: IPiece) => {
  const { stones, setSquares, location, color } = props;
  setSquares((squares: any[]) => {
    const stonesPositions = stones.map((item: any) => item.position);
    const [startRow, startCol] = location;

    return squares.map((square: any) => {
      const [targetRow, targetCol] = square.position;
      let isTarget = "empty";

      const rowDiff = Math.abs(targetRow - startRow);
      const colDiff = Math.abs(targetCol - startCol);

      let isBlocked = false;

      if (rowDiff === colDiff && rowDiff !== 0 && colDiff !== 0) {
        const rowIncrement = targetRow >= startRow ? 1 : -1;
        const colIncrement = targetCol >= startCol ? 1 : -1;

        let currentRow = startRow + rowIncrement;
        let currentCol = startCol + colIncrement;

        while (currentRow !== targetRow && currentCol !== targetCol) {
          if (
            stonesPositions.some(
              ([pieceRow, pieceCol]: [number, number]) =>
                pieceRow === currentRow && pieceCol === currentCol
            )
          ) {
            isBlocked = true;
            break;
          }

          currentRow += rowIncrement;
          currentCol += colIncrement;
        }
      } else {
        isBlocked = true;
      }

      const isSelected = !isBlocked;

      if (square.position[0] === startRow && square.position[1] === startCol) {
        isTarget = "me";
      }

      if (isSelected) {
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
      return { ...square, isSelected, isTarget };
    });
  });
};

export default bishop;
