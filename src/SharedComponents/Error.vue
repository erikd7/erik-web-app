<template>
    <div class="middle error text-4xl">
        <i class="text-red-600 fa fa-exclamation-triangle" />
        {{ message }}
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        components: {},
        props: {
            message: {
                type: String,
                default: 'Error',
            },
        },
    };
</script>

<style scoped>
    .error {
        color: #425677;
    }
</style>
