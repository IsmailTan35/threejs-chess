import { IPiece } from "./iPiece";

function knight(props: IPiece) {
  const { location, setSquares } = props;
  setSquares((e: any[]) => {
    const [startRow, startCol] = location;

    return e.map((item: any) => {
      const [targetRow, targetCol] = item.position;
      const isSelected =
        (Math.abs(targetRow - startRow) === 2 &&
          Math.abs(targetCol - startCol) === 1) ||
        (Math.abs(targetRow - startRow) === 1 &&
          Math.abs(targetCol - startCol) === 2);

      return { ...item, isSelected };
    });
  });
}

export default knight;
