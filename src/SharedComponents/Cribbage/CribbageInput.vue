<template>
  <span class="grid grid-cols-4 gap-4">
    <div
      v-for="option in options"
      :key="option.value"
      class="mx-auto flex flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60"
      :class="{
        'hover-grow cursor-pointer': !option.disabled,
        'opacity-20': option.disabled,
      }"
    >
      <PlayingCard
        :cardFace="option.value"
        :title="option.value"
        class="max-w-60 w-28 object-cover"
        :disabled="option.disabled"
        :onSelect="() => selectFunction(option.value)"
      />
    </div>
  </span>
</template>

<script>
import PlayingCard from './PlayingCard.vue';

export default {
  data() {
    return {};
  },
  components: { PlayingCard },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectFunction: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
