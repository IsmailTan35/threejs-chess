import { IPiece } from "./iPiece";

function pawn(props: IPiece) {
  const { location, color, setSquares } = props;
  const direction = color === "white" ? -1 : 1;
  const isSelectable: any = [
    [location[0] - 1, location[1] + direction * 1],
    [location[0] + 1, location[1] + direction * 1],
    [location[0], location[1] + direction * 1],
    [location[0], location[1] + direction * 2],
  ];

  if (
    (direction === -1 && location[0] === 6) ||
    (direction === 1 && location[0] === 1)
  ) {
    isSelectable.push([
      location[0] + direction * 2,
      location[1] + direction * 1,
    ]);
  }

  setSquares((squares: any[]) => {
    return squares.map((item: any) => {
      const isSelected = isSelectable.some(
        ([row, col]: [number, number]) =>
          row === item.position[0] && col === item.position[1]
      );
      if (isSelected && location[1] === item.position[1]) {
        const isBlocked = squares.some(
          (square: any) =>
            square.position[0] === location[0] + direction &&
            square.position[1] === location[1]
        );

        if (isBlocked) {
          return { ...item, isSelected: false };
        }
      }

      return { ...item, isSelected };
    });
  });
}

export default pawn;
