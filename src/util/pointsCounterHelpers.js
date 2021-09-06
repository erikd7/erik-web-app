/**
 * @description      :
 * @author           : ebdie
 * @group            :
 * @created          : 06/09/2021 - 11:38:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 06/09/2021
 * - Author          : ebdie
 * - Modification    :
 **/
import { cloneDeep } from "lodash";

const orderedFaces = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const lastCard = orderedFaces[orderedFaces.length - 1];
const isLastCard = (face) => {
  face === lastCard;
};

const facesToValues = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 10,
  Q: 10,
  K: 10,
};

const createCardHash = (cards) => {
  //Create hash of card -> index in cards array
  let cardsMap = {};
  cards.forEach((card, index) => {
    const current = cardsMap[card] ? cardsMap[card] : [];
    cardsMap[card] = current.concat(index);
  });
  return cardsMap;
};

const getNumCombos = (array) => {
  const r = 2; //pairs of 2
  const n = array.length;
  //n>=r>=0
  if (n < r) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
};

const factorial = (number) => {
  let total = 1;
  for (let i = 0; i < number; i++) {
    total *= number - i;
  }
  return total;
};

export const helpers = {
  orderedFaces,
  isLastCard,
  facesToValues,
  createCardHash,
  getNumCombos,
  factorial,
};
export class CardResult {
  constructor(pairs, runs, sums) {
    this.pairs = pairs;
    this.runs = runs;
    this.sums = sums;
  }

  static build() {
    const blankInsideObject = { cards: [], points: 0 };
    return new CardResult(
      cloneDeep(blankInsideObject),
      cloneDeep(blankInsideObject),
      cloneDeep(blankInsideObject)
    );
  }
}
