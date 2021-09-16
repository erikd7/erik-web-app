<template>
  <div class="flex flex-col">
    <div class="p-b-10">
      enter points placeholder
      <button class="button" @click="calculatePoints()">
        Count Points
      </button>
    </div>
    <div v-if="totalPoints">Total Points is {{ totalPoints }}</div>
    <div
      v-if="totalPoints"
      class="flex flex-row justify-items-center justify-evenly flex-wrap"
    >
      <Card
        cardTitle="Sums"
        cardLabel="Sum"
        :cards="cardsResult.sums.cards"
        :points="cardsResult.sums.points"
      />
      <Card
        cardTitle="Pairs"
        cardLabel="Pair"
        :cards="cardsResult.pairs.cards"
        :points="cardsResult.pairs.points"
      />
      <Card
        cardTitle="Runs"
        cardLabel="Run"
        :cards="cardsResult.runs.cards"
        :points="cardsResult.runs.points"
      />
    </div>
  </div>
</template>

<script>
import Card from "../SharedComponents/Card.vue";
import { helpers, CardResult } from "../util/pointsCounterHelpers";

export default {
  components: { Card },
  props: {
    resume: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cardValues: [8, 5, 5, 5, 6, 7, 8, 9],
      cardFaces: ["8", "Q", "K", "2", "5", "5", "5", "6", "7", "8", "J"],
      total: 15,
      totalPoints: 0,
      cardsResult: CardResult.build(),
    };
  },
  methods: {
    calculatePoints() {
      this.cardsResult = CardResult.build();
      //const cardsValueMap = this.createCardHash(this.cardValues)
      const cardsFaceMap = helpers.createCardHash(this.cardFaces);
      this.getSumPoints(this.cardValues, this.total);
      //this.getPairPoints(cardsFaceMap);
      //this.getRunPoints(cardsFaceMap);
      this.totalPoints = 10;
      console.log("end", this.cardsResult);
    },
    getPairPoints(cardsMap) {
      let numCombos = 0;
      //Get number of points using combinations
      Object.values(cardsMap).forEach(
        (p) => (numCombos += helpers.getNumCombos(p))
      );

      //Get cards of pairs using loop
      let pairCards = [];
      Object.keys(cardsMap).forEach((face) => {
        const numCards = cardsMap[face].length;
        if (numCards >= 2) {
          pairCards.push(new Array(numCards).fill(face));
        }
      });

      //Return results
      this.cardsResult.pairs.points += 2 * numCombos;
      this.cardsResult.pairs.cards = pairCards;
    },
    getRunPoints(cardsMap) {
      const minRunLength = 3;
      let runs = {};
      let starterCard = "x";
      //Loop through facecards and check for next in sequence
      helpers.orderedFaces.concat(["z"]).forEach((face) => {
        //add dummy to last card to count runs ending with lastcard. refactor later
        const cardInHand = cardsMap[face];

        if (cardInHand) {
          if (starterCard === "x") {
            //If it's first in a sequence
            starterCard = face;
            runs[face] = [face];
          } else {
            //If part of existing sequence
            runs[starterCard].push(face);
          }
        } else {
          if (starterCard !== "x" && runs[starterCard].length >= minRunLength) {
            //If end of run, document cards and points
            this.cardsResult.runs.cards.push(runs[starterCard]);
            this.cardsResult.runs.points += runs[starterCard].length;
          }
          starterCard = "x";
        }
      });
      console.log("runs is", runs);
      console.log("runs result is", this.cardsResult.runs.cards);
    },
    /*getSumPoints(cards, target, cardsMap) {
        console.log('cards map is ', cardsMap, target   )
        for (const topCardIndex in cards) {
            const topCard = cards[topCardIndex]
            console.log('topcardindex is', topCardIndex)
            console.log('cards is', cards)
            console.log('sliced cards is', cards.slice(topCardIndex + 1))
            for (const nextCardIndex in cards.slice(topCardIndex + 1)) {
                const nextCard = cards[nextCardIndex]
            }
        }
      },*/
    cardsToFaceValues() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-weight: bold;
}
</style>
