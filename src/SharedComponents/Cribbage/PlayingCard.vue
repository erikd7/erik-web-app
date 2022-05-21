<template>
  <img
    :src="require(`@/data/cards/${cardFace === 'AD' ? 'AceD' : cardFace}.svg`)"
    @click="
      () => {
        if (!disabled) onSelect();
      }
    "
  />
  <!-- Loading image titled 'AD' can be blocked by some ad blockers -->
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    cardFace: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onSelect: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
