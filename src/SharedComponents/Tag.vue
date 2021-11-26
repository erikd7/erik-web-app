<template>
    <div class="tag hover-grow" :title="tooltip"> {{ label }} </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: {
            label: {
                type: String,
                default: '',
            },
            tooltip: {
                type: String,
                default: '',
            },
        },
    };
</script>

<style scoped>
    .tag {
        border: 2px solid #506380;
        margin: 3px;
        padding: 3px;
        border-radius: 7px;
        background-color: #60789e;
        color: white;
    }
</style>
