<template>
  <div
    :class="`card-container ${className} ${hoverGrow ? 'hover-grow' : ''}`"
    :style="{ '--bg-color': color, '--scale': 1.01 }"
  >
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
    <div class="mt-auto">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    className: {
      type: String,
      default: ""
    },
    header: {
      type: String,
      default: ""
    },
    headerClass: {
      type: String,
      default: ""
    },
    subHeader: {
      type: String,
      default: ""
    },
    hoverGrow: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#c3cfe9"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card-container {
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  background-color: var(--bg-color);
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
