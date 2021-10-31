<template>
  <div>
    <div class="menu">
      <div
        v-for="section in sections"
        :key="section.path"
        class="menu-item-spacer"
      >
        <router-link :to="section.path">
          <div
            class="menu-item"
            :class="{
              'menu-item-selected': section.path === current,
            }"
          >
            {{ section.name }}
          </div>
        </router-link>
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
    sections: {
      type: Array,
      default: () => [{ name: "Home", path: "/" }],
    },
    current: {
      type: String,
      default: "/home",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  display: flex;
  flex-flow: row;
  justify-content: center;
}
.menu-item-spacer {
  margin-left: 10px;
  margin-right: 10px;
}
.menu-item {
  color: black;
  border-radius: 5px;
  padding: 5px;
}
.menu-item:hover {
  color: white;
  background-color: #60789e;
  cursor: pointer;
}
.menu-item-selected {
  color: white !important;
  background-color: #60789e;
  cursor: pointer;
}
</style>
