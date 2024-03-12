<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <div class="p-b-10 flex justify-center">
        <input
          v-model="handEntry"
          ref="handInput"
          placeholder="Enter hand (e.g. AS,TC,4H,KD,2S)"
          @focus="
            () => {
              isHandEntryFocused = true;
            }
          "
          @blur="
            () => {
              isHandEntryFocused = false;
              isUsingSelector = false;
            }
          "
          @input="handleInput"
          @keypress.enter="calculatePoints"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300 rounded m-1
        transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          style="width: 300px;"
        />
        <button
          class="button m-1"
          @click="calculatePoints"
          :disabled="!isHandValid?.ok"
          :title="validityMessage"
        >
          Count Points
        </button>
      </div>
      <span v-if="!isUsingSelector">
        <!--Entry guide-->
        <div
          v-if="!handEntry && isHandEntryFocused && isHandValid?.message"
          class="flex justify-center"
        >
          <div
            class="w-fit p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
            role="alert"
          >
            <span class="font-medium">
              Hands should have 5 comma-separated cards, which follow the format
              &lt;face&gt;&lt;suit&gt;.
            </span>
          </div>
        </div>
        <!--Error message-->
        <div
          v-else-if="handEntry && !isHandEntryFocused && isHandValid?.message"
          class="flex justify-center transition-smooth"
        >
          <div
            class="w-fit p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
            role="alert"
          >
            <span class="font-medium">{{ validityMessage }}</span>
          </div>
        </div>
      </span>
    </div>
    <div v-if="handEntry?.length < 5" class="flex justify-center p-2">
      <CribbageInput :options="selectOptions" :selectFunction="selectCard" />
    </div>
    <div v-if="this.cardsResult.totalPoints">
      <div class="pt-3 text-4xl text-center">
        Total Points: {{ this.cardsResult.totalPoints }}
      </div>
      <div
        class="flex flex-row justify-items-center justify-evenly flex-wrap mobile-one-col"
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
  </div>
</template>

<script>
import Card from "../SharedComponents/Card.vue";
import CribbageInput from "../SharedComponents/Cribbage/CribbageInput.vue";
import { CardResult, helpers } from "../util/pointsCounterHelpers";

export default {
  components: { Card, CribbageInput },
  props: {
    resume: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      cardsResult: {},
      handEntry: "",
      selectedSuit: null,
      isHandEntryFocused: false,
      isUsingSelector: true,
      isHandValid: { ok: false, message: "Enter a hand to count points." }
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
    selectCard(newInput) {
      if (this.selectedSuit) {
        this.handEntry = this.handEntry.concat(newInput);
        this.handleInput();
        this.selectedSuit = null;
      } else {
        this.selectedSuit = newInput;
      }
      if (!this.isUsingSelector) this.isUsingSelector = true;
      if (this.handEntry?.length === 5) {
        this.calculatePoints();
      }
    }
  },
  computed: {
    validityMessage() {
      return (
        this.isHandValid?.message ||
        `The hand isn't valid. Make sure there are 5 comma-separated hands in the format <face><suit>. Use T for 10.`
      );
    },
    selectOptions() {
      if (!this.selectedSuit) {
        return helpers.suits.map(suit => ({ value: suit }));
      }

      return helpers.orderedFaces.map(face => ({
        value: face.concat(this.selectedSuit),
        disabled: this.handEntry.includes(face.concat(this.selectedSuit))
      }));
    }
  }
};
</script>
