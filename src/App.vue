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
        height: 100vh;
        overflow-y: hidden;
    }
    .menuPane {
        width: 100%;
        border-bottom: 2px solid #60789e;
        box-shadow: 0px 0px 5px grey;
        padding: 5px;
        height: 45px;
        z-index: 5;
    }
    .mainPane {
        height: calc(100vh - 45px);
        overflow-y: auto;
        width: 100%;
        padding: 5px;
    }
    .mainPane-container {
        padding: 5px;
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
    .middle {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @media only screen and (min-device-width: 480px) {
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: unset;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
    .hover-grow {
        transition: all 0.15s ease-in-out;
    }
    .hover-grow:hover {
        transform: scale(1.1);
    }
    .vertical-center {
        transform: translateY(-50%);
        top: 50%;
        position: relative;
    }
    .image-display {
        border-radius: 10px;
        object-fit: cover;
        width: 300px;
    }
</style>
