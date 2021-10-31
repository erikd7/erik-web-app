<template>
  <div>
    <div v-for="(set, index) in cards" :key="index">
      <div v-for="cardFace in set" :key="cardFace" class="">
        {{ `${label} ${index + 1}:` }} {{ cardFace }} x {{ set[cardFace] }}
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
      default: () => [],
    },
    label: {
      type: String,
      default: "Set",
    },
  },
};
</script>
