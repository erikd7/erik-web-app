<template>
    <div id="app">
        <div class="menuPane">
            <Menu :sections="routes" :current="currentRoute" />
        </div>
        <div class="mainPane">
            <router-view />
        </div>
    </div>
</template>

<script>
    import Menu from './components/Menu.vue';
    import { routes } from './router/index';

    export default {
        name: 'App',
        components: {
            Menu,
        },
        computed: {
            routes() {
                return routes;
            },
            currentRoute() {
                return this.$route.path;
            },
        },
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: black;
        display: flex;
        flex-flow: wrap;
        padding: 10px;
    }
    .menuPane {
        width: 100%;
        margin: 20px 0px;
        border-bottom: 2px solid #60789e;
    }
    .mainPane {
        width: 100%;
    }
    .button {
        color: white;
        background-color: #60789e;
        border-radius: 8px;
        padding: 3px;
        border: 1px solid #60789e;
    }
    .button:hover {
        color: white;
        background-color: #425677;
        cursor: pointer;
    }
    .link {
        color: blue;
    }
    .link:hover {
        text-decoration: underline;
    }
    .sidebar-container {
        position: absolute;
        float: left;
    }
</style>
