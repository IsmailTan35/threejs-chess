export interface PieceProps {
  idx: number;
  position: [number, number, number];
  color: "white" | "black";
  type: "pawn" | "queen" | "king" | "bishop" | "rook" | "knight";
  model: boolean;
  setSquares: any;
  setSelected: any;
  selected: any;
  step: string;
  setStep: any;
  stones: any;
  isEnabled: boolean;
  setAttributes: any;
  attributes: any;
  squares: any;
}

export interface ISquareProps {
  color?: "white" | "black";
  type?: "pawn" | "queen" | "king" | "bishop" | "rook" | "knight";
  model?: boolean;
  isEnabled?: boolean;
  idx: number;
  selected: any;
  setSelected: any;
  stones: {
    position: number[];
    color: string;
    type: string;
  }[];
  attributes: any;
  setStep: any;
  setStones: any;
  setAttributes: any;
  isSelected: boolean;
  isTarget: "empty" | "attack" | "friendly" | "me";
  step: "white" | "black";
  position?: number[];
}

export interface IAttributes {
  movedPawn: any[];
  rog: boolean;
  captured: any[];
}

export interface ISelected {
  id: any;
  color: string;
  type: string;
  coordinate: [any, any, number];
}

export interface IChessBoardProps {
  step: "white" | "black";
  setStep: any;
  stones: any;
  setStones: any;
  selected: any;
  setSquares: any;
  squares: any;
  setSelected: any;
  setWhiteAttributes: any;
  blackAttributes: any;
  whiteAttributes: any;
  setBlackAttributes: any;
}
