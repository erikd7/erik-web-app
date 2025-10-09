<template>
  <div>
    <div
      class="fan"
      data-fan="spacing: 0.1; width: 80; radius: 80; cards: AS,KS"
    ></div>
    <div v-for="(set, index) in cards" :key="index">
      <div class="hand hhand-compact active-hand flex justify-center">
        <img
          v-for="cardFace in set"
          :key="cardFace"
          class="card transition-smooth p-1"
          style="--duration: .2s;
          width: 80px;
          height: auto;"
          :src="require(`@/data/cards/${cardFace}.svg`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    cards: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: "Set"
    }
  }
};
</script>
