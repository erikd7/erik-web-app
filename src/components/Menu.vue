<template>
    <div>
        <div class="menu">
            <div
                v-for="section in sections"
                :key="section.path"
                class="menu-item"
                :class="{
                    'menu-item-selected': section.path === current,
                }"
            >
                <router-link :to="section.path">{{ section.name }}</router-link>
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
                default: () => [{ name: 'Home', path: '/' }],
            },
            current: {
                type: String,
                default: '/home',
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
