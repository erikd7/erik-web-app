/**
 * @description      :
 * @author           : ebdie
 * @group            :
 * @created          : 10/10/2021 - 11:02:35
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 10/10/2021
 * - Author          : ebdie
 * - Modification    :
 **/
export const rankArray = [1, 2, 3, 4, 5, 6, 7, 8];
export const fileArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const fileIndexMap = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
//export const fileToIndex = (file) => fileArray.indexOf(file) + 1;

export const squareLabel = (rank, file) => `${file.toUpperCase()} - ${rank}`;

const rankIsEven = (rank) => rank % 2 === 0;
const fileIsEven = (file) => fileIndexMap[file] % 2 === 0;
export const squareIsEven = (rank, file) =>
  rankIsEven(rank) === fileIsEven(file);

export const piecesDisplay = {
  wk: "\u2654",
  wq: "\u2655",
  wr: "\u2656",
  wb: "\u2657",
  wn: "\u2658",
  wp: "\u2659",

  bk: "\u265A",
  bq: "\u265B",
  br: "\u265C",
  bb: "\u265D",
  bn: "\u265E",
  bp: "\u265F",
};
export const getDisplayPiece = (piece) => piecesDisplay[piece.substring(0, 2)];

export const colorDisplay = { w: "White", b: "Black" };

//export const nextPlayer = { w: "b", b: "w" };
//export const switchMove = (player) => nextPlayer[player];

export const anyPossibleMove = (game, fromSquare) => {
  const piece = game.board[fromSquare];

  if (!piece) return false;
  if (game.toMove !== piece[0]) return false;
  const allowedMoves = game?.allowedMoves[piece];
  if (!allowedMoves || !Object.keys(allowedMoves).length) return false;

  return true;
};

export const isMoveAllowed = (game, fromSquare, toSquare) => {
  const piece = game.board[fromSquare];

  //In allowed moves
  const allowedMoves = game?.allowedMoves[piece];
  return allowedMoves ? allowedMoves[toSquare] : false;
};
