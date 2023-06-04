import { IAttributes, ISelected } from "./interfaces";

const initialWhiteAttributes: IAttributes = {
  movedPawn: [],
  rog: false,
  captured: [],
};

const initialBlackAttributes: IAttributes = {
  movedPawn: [],
  rog: false,
  captured: [],
};

const initialSelected: ISelected = {
  id: null,
  color: "",
  type: "",
  coordinate: [null, null, 1],
};

export { initialWhiteAttributes, initialBlackAttributes, initialSelected };
