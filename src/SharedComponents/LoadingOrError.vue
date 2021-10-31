<template>
  <div>
    <Loading v-if="loadingMessage" :message="loadingMessage" />
    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import Loading from "./Loading";
import Error from "./Error";

export default {
  components: { Loading, Error },
  props: {
    loadingMessage: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
};
</script>
