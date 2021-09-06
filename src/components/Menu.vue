<template>
    <div>
        <div class="menu">
            <div
                v-for="section in sections"
                :key="section.key"
                class="menu-item"
                :class="{
                    'menu-item-selected': section.key === current
                }"
                @click="setSection(section.key)"
            >
                <p>{{ section.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    sections: {
        type: Object,
        default: () => ['Home']
    },
    current: {
        type: String,
        default: 'home'
    },
    setSection: {
        type: Function,
        default: () => {},
    },
  }
}
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
    border-radius: 15px;
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
