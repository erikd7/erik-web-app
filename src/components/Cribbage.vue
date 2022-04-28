<template>
  <div class="flex flex-col">
    <div class="p-b-10">
      <input
        v-model="handEntry"
        placeholder="Enter hand"
        @change="handleInput"
        @keypress.enter="calculatePoints"
      />
      <button class="button" @click="calculatePoints">
        Count Points
      </button>
    </div>
    <div v-if="this.cardsResult.totalPoints">
      Total Points is {{ this.cardsResult.totalPoints }}
    </div>
    <div
      v-if="this.cardsResult.totalPoints"
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
import Card from '../SharedComponents/Card.vue';
import { CardResult, helpers } from '../util/pointsCounterHelpers';

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
      cardsResult: {},
      handEntry: '',
      isHandValid: { ok: false, message: 'Nothing entered.' },
    };
  },
  methods: {
    calculatePoints() {
      if (this.isHandValid.ok) {
        this.cardsResult = CardResult.build(this.handEntry);
        this.cardsResult.calculatePoints();
      }
    },
    handleInput() {
      this.handEntry = helpers.formatInput(this.handEntry);
      this.isHandValid = helpers.validateHand(this.handEntry);
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-weight: bold;
}
</style>
