<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: {
            cards: {
                type: Array,
                default: () => [],
            },
            cardLabel: {
                type: String,
                default: '',
            },
            cardTitle: {
                type: String,
                default: '',
            },
            points: {
                type: Number,
                default: 0,
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .card {
        padding: 5px;
        margin: 5px;
        border-radius: 10px;
        background-color: #c3cfe9;
        text-align: center;
    }
    .card-title {
        font-weight: bold;
        border-bottom: 1px solid #425677;
    }
    .card-title > div {
        padding: 0px 5px;
    }
</style>
