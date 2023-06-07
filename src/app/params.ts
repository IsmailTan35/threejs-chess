const scales = {
  pawn: 0.04,
  queen: 0.06,
  king: 0.05,
  bishop: 0.05,
  rook: 0.25,
  knight: 0.4,
};

const rotation = {
  white: {
    pawn: [0, 1.6, 0],
    queen: [0, 1.6, 0],
    king: [0, 1.6, 0],
    bishop: [0, 1.6, 0],
    rook: [0, 0, 0],
    knight: [0, 3.15, 0],
  },
  black: {
    pawn: [0, 1.6, 0],
    queen: [0, 1.6, 0],
    king: [0, 1.6, 0],
    bishop: [0, 1.6, 0],
    rook: [0, 0, 0],
    knight: [0, 3.15, 3.2],
  },
};

const positionZ = {
  pawn: 0.26,
  queen: 0.59,
  king: 0.64,
  bishop: 0.48,
  rook: 0.03,
  knight: 0.45,
};

const squareColors = {
  empty: "0x00ff00",
  attack: "0xff3333",
  friendly: "0xa9a9a9",
  me: "0x656565",
  default: "0x00ff00",
  white: "0x808080",
  black: "0x512500",
  hover: "0xff3333",
  king: "0x000000",
};

export { scales, rotation, positionZ, squareColors };
