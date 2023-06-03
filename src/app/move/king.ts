import { IPiece } from "./iPiece";

function king(props: IPiece) {
  const { setSquares, location } = props;
  setSquares((e: any[]) => {
    const [startRow, startCol] = location;
    const isSelectedFunc = (targetRow: number, targetCol: number) => {
      const rowDiff = Math.abs(targetRow - startRow);
      const colDiff = Math.abs(targetCol - startCol);
      return (
        (rowDiff === 1 && colDiff === 0) ||
        (rowDiff === 0 && colDiff === 1) ||
        (rowDiff === 1 && colDiff === 1)
      );
    };

    return e.map((item: any) => {
      const [targetRow, targetCol] = item.position;
      const isSelected = isSelectedFunc(targetRow, targetCol);

      return { ...item, isSelected };
    });
  });
}

export default king;
