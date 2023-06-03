import { IPiece } from "./iPiece";

const bishop = (props: IPiece) => {
  const { stones, setSquares, location } = props;
  setSquares((e: any[]) => {
    const stonesPositions = stones.map((item: any) => item.position);
    const [startRow, startCol] = location;

    return e.map((item: any) => {
      const [targetRow, targetCol] = item.position;

      const rowDiff = Math.abs(targetRow - startRow);
      const colDiff = Math.abs(targetCol - startCol);

      let isBlocked = false;

      if (rowDiff === colDiff && rowDiff !== 0 && colDiff !== 0) {
        const rowIncrement = targetRow > startRow ? 1 : -1;
        const colIncrement = targetCol > startCol ? 1 : -1;

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

      return { ...item, isSelected };
    });
  });
};

export default bishop;
