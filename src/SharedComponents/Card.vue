<template>
  <CardTile style="min-width: 200px;">
    <template v-slot:header>
      <div class="card-title flex flex-column justify-between">
        <div>{{ cardTitle }}</div>
        <div>{{ points }}pts</div>
      </div>
    </template>
    <template v-slot:body>
      <PointsSummary :label="cardLabel" :cards="cards" />
    </template>
  </CardTile>
</template>

<script>
import PointsSummary from '../SharedComponents/PointsSummary.vue';
import CardTile from '../SharedComponents/CardTile.vue';

export default {
  data() {
    return {};
  },
  components: { PointsSummary, CardTile },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    cardLabel: {
      type: String,
      default: '',
    },
    cardTitle: {
      type: String,
      default: '',
    },
    points: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.card-title {
  font-weight: bold;
  border-bottom: 1px solid #425677;
}
.card-title > div {
  padding: 0px 5px;
}
</style>
