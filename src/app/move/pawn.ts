import { IPiece } from "./iPiece";

function pawn(props: IPiece) {
  const { location, color, setSquares, attributes, step, selected, stones } =
    props;
  const stonesPositions = stones.map((item: any) => item.position);

  const direction = color === "white" ? -1 : 1;
  const isSelectable: any = [
    [location[0] - 1, location[1] + direction * 1],
    [location[0] + 1, location[1] + direction * 1],
    [location[0], location[1] + direction * 1],
  ];
  if (step && !attributes[step].movedPawn.includes(selected.id)) {
    isSelectable.push([location[0], location[1] + direction * 2]);
  }

  if (
    (direction === -1 && location[0] === 8) ||
    (direction === 1 && location[0] === -1)
  ) {
    isSelectable.push([
      location[0] + direction * 2,
      location[1] + direction * 1,
    ]);
  }
  const [startRow, startCol] = location;

  setSquares((squares: any) => {
    return squares.map((square: any) => {
      const [targetRow, targetCol] = square.position;

      let isTarget = "empty";
      let isSelected =
        isSelectable.find(
          (selectable: any) =>
            (selectable[0] === square.position[0] &&
              selectable[1] === square.position[1]) ||
            (square.position[0] === startRow && square.position[1] === startCol)
        ) !== undefined;

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
      if (isSelected) {
        if (
          square.position[0] === startRow &&
          square.position[1] === startCol
        ) {
          isTarget = "me";
        } else {
          const targetStone = stones.find(
            (stone: any) =>
              stone.position[0] === square.position[0] &&
              stone.position[1] === square.position[1]
          );
          if (targetStone) {
            isTarget = targetStone.color === color ? "attack" : "friendly";
            if (
              !isBlocked &&
              isTarget === "attack" &&
              selected.color !== color
            ) {
              isTarget = "empty";
              isSelected = false;
            }
          } else {
            if (isBlocked) {
              isSelected = false;
            }
            isTarget = "empty";
            if (
              (square.position[0] === isSelectable[0][0] &&
                square.position[1] === isSelectable[0][1]) ||
              (square.position[0] === isSelectable[1][0] &&
                square.position[1] === isSelectable[1][1])
            ) {
              isSelected = false;
            }
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
export default pawn;
