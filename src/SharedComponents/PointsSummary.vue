<template>
  <div>
    <div v-for="(set, index) in cards" :key="`${card}@${index}`">
      {{ `${label} ${index + 1}:` }}
      <a v-for="(card, index) in set" :key="`${card}@${index}`" class="">
        {{ card }}
      </a>
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
      default: () => [],
    },
    label: {
      type: String,
      default: "Set",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.menu {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
}
.menu-item {
  color: black;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}
.menu-item:hover {
  color: white;
  background-color: #60789e;
  cursor: pointer;
}
</style>
