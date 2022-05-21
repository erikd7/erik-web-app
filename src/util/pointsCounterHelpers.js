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
  "T",
  "J",
  "Q",
  "K",
];

const suits = ['S', 'H', 'D', 'C'];

const formatInput = input => {
  if (!input?.length) return "";

  return (input || "")
  .toString()
  .toUpperCase()
  .replace(" ", ",")
  .replace(new RegExp(`[^${orderedFaces.concat(suits).join('|')}|,|]`),"")
  .split(',');
}

const cardRegexString = `[${orderedFaces.join('|')}][${suits.join('|')}]`

const cardRegEx = new RegExp(cardRegexString)

const validateHand = hand => {
  const handArray = formatInput(hand);

  //Right length
  if (handArray.length !== 5) return { ok: false, message: 'Hand must have 5 cards.'}

  //Cards formatted correctly
  const problemCards = handArray.filter(card => !cardRegEx.test(card));
  if (problemCards.length) 
    return { ok: false, message: `The following card${problemCards.length > 1 ? "s are" : " is"} invalid: ${problemCards.join() || '[blank card]'}`}

  //No duplicate cards
  const cardMap = handArray.reduce((map, card) => ({...map, [card]: (map[card] || 0) + 1}), {})
  if (Object.values(cardMap).some(count => count > 1))
    return { ok: false, message: 'All cards must be unique.'}

  //Otherwise ok
  return { ok: true, message: null}

}

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
  T: 10,
  J: 10,
  Q: 10,
  K: 10,
};

const getFaceForCard = card => card.slice(0, card.length - 1)

const getCardHash = (cards) => {
  //Create hash of card -> index in cards array
  let cardsMap = {};
  cards.forEach((card, index) => {
    const current = cardsMap[card] ? cardsMap[card] : [];
    cardsMap[card] = current.concat(index);
  });
  return cardsMap;
};

const getRunArrays = (cardsMap, cards) => {
  const minRunLength = 3;
  let currentRun = [];
  let set = {};
  let starterCard = null;
  //Loop through all faces and check for next in sequence
  helpers.orderedFaces.concat(["z"]).forEach((face) => {
    //add dummy to last card to count runs ending with lastcard. refactor later
    const cardsInHand = cardsMap[face];
    if (!cardsInHand?.length) {
      if (currentRun.length >= minRunLength) {
        set[starterCard] = currentRun
      }
      starterCard = null;
      currentRun = [];
      return;
    } 
      if (!starterCard) {
        starterCard = face; 
      }
      currentRun.push(cardsInHand.map(cardIndex => cards[cardIndex]))
    } 
  );

  return set;
}

const getRunCombos = (runArrays) => {
  let cards = [];
  let points = 0;
  const combosEnd = runArrays.length - 1;
  const getCombos = (array, i) => {
      for (let faceIndex = 0; faceIndex < runArrays[i].length; faceIndex++) {
          let arrayClone = cloneDeep(array) // clone array

          //Add current card to current array
          arrayClone.push(runArrays[i][faceIndex]);

          //Cycle again if the array isn't full Length
          if (i < combosEnd) {
              getCombos(arrayClone, i + 1);
          }
          //Track the array if it's the end of this array
          else {
            cards.push(arrayClone);
              points += arrayClone.length;
          }
      }
  }
  getCombos([], 0);
  return { cards, points };
}

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

const waysToSum = (cards, sumTo, cardsSoFar = [], successfulCards = []) => {
  const locCards = cloneDeep(cards);
  const locCardsSoFar = cloneDeep(cardsSoFar);
  for (let index = 0; index < locCards.length; index++) {
    const loopCardsSoFar = cloneDeep(locCardsSoFar)
    const current = locCards[index]

    //track the current traversal
    loopCardsSoFar.push(current.card)

    //new value to sum to
    const newSumTo = sumTo - current.value;

    //if it adds to new value
    if (newSumTo === 0) {
      successfulCards.push(loopCardsSoFar);
    } else if (newSumTo > 0 && locCards.length) {
      //use recursion to evaluate next cards
      waysToSum(locCards.slice(index + 1),newSumTo, loopCardsSoFar, successfulCards);
    } 
  }

  return successfulCards;
}

export const helpers = {
  suits,
  orderedFaces,
  formatInput,
  cardRegEx,
  validateHand,
  getFaceForCard,
  isLastCard,
  facesToValues,
  getCardHash,
  getRunArrays,
  getNumCombos,
  factorial,
  waysToSum
};

export class CardResult {
  constructor(cards, pairs, runs, sums) {
    this.cards = cards;
    this.pairs = pairs;
    this.runs = runs;
    this.sums = sums;
  }

  getCardFacesWithoutSuit() {
    this.faces = this.cards.reduce((facesWithoutSuit, face) => facesWithoutSuit.concat(getFaceForCard(face)),[])
  }

  getCardHash() {
    //Create hash of card -> index in cards array
    let cardsMap = {};
    this.faces.forEach((card, index) => {
      const current = cardsMap[card] ? cardsMap[card] : [];
      cardsMap[card] = current.concat(index);
    });
    this.cardsMap = cardsMap;
  }

  static build(cards) {
    const blankInsideObject = { cards: [], points: 0 };
    const created = new CardResult(
      cards,
      cloneDeep(blankInsideObject),
      cloneDeep(blankInsideObject),
      cloneDeep(blankInsideObject)
    );

    created.getCardFacesWithoutSuit();
    created.getCardHash();

    return created;
  }

  getSumPoints() {
    const sums = waysToSum(this.cards.map(c => ({card: c, value: facesToValues[getFaceForCard(c)] })), 15);
    this.sums.points += 2 * sums.length;
    this.sums.cards = sums;
  }

  getRunPoints() {
    const set = getRunArrays(this.cardsMap, this.cards);

    Object.keys(set).forEach(starterCard => {
      const runs = getRunCombos(set[starterCard])
      this.runs.cards = this.runs.cards.concat(runs.cards);
      this.runs.points += runs.points;
    })
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
        //Get actual faces
        const cards = this.cardsMap[key].reduce((cards,index) => cards.concat(this.cards[index]), []);
        pairCards.push(cards);
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
