import bishop from "./bishop";
import king from "./king";
import knight from "./knight";
import pawn from "./pawn";
import queen from "./queen";
import rook from "./rook";

const pieces = {
  king: king,
  rook: rook,
  pawn: pawn,
  queen: queen,
  bishop: bishop,
  knight: knight,
  null: () => {
    console.log(21321);
  },
};

export default pieces;
