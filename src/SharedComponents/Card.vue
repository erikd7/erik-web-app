<template>
  <div style="min-width: 200px;">
    <div class="card">
      <div class="card-title flex flex-column justify-between">
        <div>{{ cardTitle }}</div>
        <div>{{ points }}pts</div>
      </div>
      <PointsSummary :label="cardLabel" :cards="cards" />
    </div>
  </div>
</template>

<script>
import PointsSummary from "../SharedComponents/PointsSummary.vue";

export default {
  data() {
    return {};
  },
  components: { PointsSummary },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    cardLabel: {
      type: String,
      default: "",
    },
    cardTitle: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  background-color: #c3cfe9;
  text-align: center;
}
.card-title {
  font-weight: bold;
  border-bottom: 1px solid #425677;
}
.card-title > div {
  padding: 0px 5px;
}
</style>
