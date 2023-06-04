import { IPiece } from "./iPiece";

const knight = (props: IPiece) => {
  const { setSquares, stones, location, color } = props;

  setSquares((squares: any) => {
    const [startRow, startCol] = location;
    return squares.map((item: any) => {
      let isTarget = "empty";
      const [targetRow, targetCol] = item.position;

      const isSelected =
        (Math.abs(startRow - targetRow) === 2 &&
          Math.abs(startCol - targetCol) === 1) ||
        (Math.abs(startRow - targetRow) === 1 &&
          Math.abs(startCol - targetCol) === 2) ||
        (item.position[0] === startRow && item.position[1] === startCol);

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

export default knight;
