import { IPiece } from "./iPiece";

const queen = (props: IPiece) => {
  const { stones, setSquares, location } = props;
  setSquares((e: any[]) => {
    const stonesPositions = stones.map((item: any) => item.position);
    const [startRow, startCol] = location;

    return e.map((item: any) => {
      const [targetRow, targetCol] = item.position;

      let isBlocked = false;

      if (
        startRow === targetRow ||
        startCol === targetCol ||
        Math.abs(targetRow - startRow) === Math.abs(targetCol - startCol)
      ) {
        const rowIncrement =
          targetRow === startRow ? 0 : targetRow > startRow ? 1 : -1;
        const colIncrement =
          targetCol === startCol ? 0 : targetCol > startCol ? 1 : -1;

        let currentRow = startRow + rowIncrement;
        let currentCol = startCol + colIncrement;

        while (currentRow !== targetRow || currentCol !== targetCol) {
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

export default queen;
