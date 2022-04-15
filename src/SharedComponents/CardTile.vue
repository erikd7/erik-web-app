<template>
  <div class="card-container" :class="{ 'hover-grow': hoverGrow }" style="--scale: 1.01">
    <div v-if="header" :class="`card-header ${headerClass}`">
      {{ header }}
      <div v-if="subHeader" class="card-subheader">
        {{ subHeader }}
      </div>
    </div>
    <div v-else>
      <slot name="header" class="card-header"></slot>
    </div>
    <div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    header: {
      type: String,
      default: '',
    },
    headerClass: {
      type: String,
      default: '',
    },
    subHeader: {
      type: String,
      default: '',
    },
    hoverGrow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card-container {
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  background-color: #c3cfe9;
  text-align: center;
  transition: all 0.15s ease-in-out;
}
.card-title {
  font-weight: bold;
  border-bottom: 1px solid #425677;
}
.card-title > div {
  padding: 0px 5px;
}
.card-header {
  border-bottom: 1px solid grey;
  font-size: larger;
}
.card-subheader {
  font-size: small;
}
</style>
