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

const waysToSum = (numbers, sumTo, numbersSoFar = [], successfulNumbers = [], level = 0) => {
  const locNumbers = cloneDeep(numbers);
  const locNumbersSoFar = cloneDeep(numbersSoFar);
  for (let index = 0; index < locNumbers.length; index++) {
    const loopNumbersSoFar = cloneDeep(locNumbersSoFar)
    const n = locNumbers[index]

    //track the current traversal
    loopNumbersSoFar.push(n)

    //new value to sum to
    const newSumTo = sumTo - n;

    //if it adds to new value
    if (newSumTo === 0) {      
      successfulNumbers.push(loopNumbersSoFar);
    } else if (newSumTo > 0 && locNumbers.length) {
      //use recursion to evaluate next numbers
      waysToSum(locNumbers.slice(index+1),newSumTo, loopNumbersSoFar, successfulNumbers, level + 1);
    } 
  }

  return successfulNumbers;
}

export const helpers = {
  orderedFaces,
  isLastCard,
  facesToValues,
  createCardHash,
  getNumCombos,
  factorial,
  waysToSum
};

export class CardResult {
  constructor(faces, pairs, runs, sums) {
    this.faces = faces;
    this.pairs = pairs;
    this.runs = runs;
    this.sums = sums;
  }

  createCardHash() {
    //Create hash of card -> index in cards array
    let cardsMap = {};
    this.faces.forEach((card, index) => {
      const current = cardsMap[card] ? cardsMap[card] : [];
      cardsMap[card] = current.concat(index);
    });
    this.cardsMap = cardsMap;
  }

  getCardValues() {
    this.values = this.faces.map(f => facesToValues[f])
  }

  static build(cardFaces) {
    const blankInsideObject = { cards: [], points: 0 };
    const created = new CardResult(
      cardFaces,
      cloneDeep(blankInsideObject),
      cloneDeep(blankInsideObject),
      cloneDeep(blankInsideObject)
    );

    created.createCardHash();
    created.getCardValues();

    return created;
  }

  getSumPoints() {
    const sums = waysToSum(this.values, 15);
    this.sums.points += 2 * sums.length;
    this.sums.cards = sums;
  }

  getRunPoints() {
    const minRunLength = 3;
    let runs = {};
    let dups = {};
    let starterCard = null;
    //Loop through all faces and check for next in sequence
    helpers.orderedFaces.concat(["z"]).forEach((face) => {
      //add dummy to last card to count runs ending with lastcard. refactor later
      const cardsInHand = this.cardsMap[face];
  
      if (cardsInHand) {
        if (starterCard === null) {
          //If it's first in a sequence
          starterCard = face;
          runs[face] = [face];
        } else {
          //If part of existing sequence
          runs[starterCard].push(face);
        }
        if (cardsInHand.length > 1) {
          dups[face] = cardsInHand.length - 1;
        }
      } 
      //If end of run, document cards and points
      else {
        if (starterCard && runs[starterCard].length >= minRunLength) {
          this.runs.cards.push(runs[starterCard]);
          //Include duplicate runs
          this.runs.points += runs[starterCard].length;
          runs[starterCard].forEach(c => {
            const runDups = dups[c];
            for (let i = 0; i < runDups; i++) {
              this.runs.cards.push(runs[starterCard]);
              this.runs.points += runs[starterCard].length;
            }
          })
          
          
        }
        starterCard = null;
      }
    });
  }

  getPairPoints() {
    let numCombos = 0;
    Object.values(this.cardsMap).forEach(
      (p) => (numCombos += helpers.getNumCombos(p))
    );
    let pairCards = [];
    Object.keys(this.cardsMap).forEach((key) => {
      const numCards = this.cardsMap[key].length;
      if (numCards >= 2) {
        let toPush = {};
        toPush[key] = numCards;
        pairCards.push(toPush);
      }
    });
    this.pairs.points += 2 * numCombos;
    this.pairs.cards = pairCards;
  }

  calculatePoints() {
    this.getSumPoints();
    this.getPairPoints();
    this.getRunPoints();

    this.totalPoints = this.sums.points + this.pairs.points + this.runs.points;
  }
}
