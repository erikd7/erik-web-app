<template>
  <div class="middle loading text-4xl">
    <i class="fas fa-spinner fa-spin"></i>
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {
    message: {
      type: String,
      default: "Loading...",
    },
  },
};
</script>

<style scoped>
.loading {
  color: #425677;
}
</style>
