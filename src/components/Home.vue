<template>
    <div>
        <CardTile header="Front End">
            JavaScript Vue.js Framework
        </CardTile>
        <CardTile header="Back End">
            Python Flask Framework
        </CardTile>
        <CardTile header="DevOps">
            GitHub and Docker
        </CardTile>
    </div>
</template>

<script>
    import CardTile from '../SharedComponents/CardTile.vue';
    export default {
        components: { CardTile },
        props: {},
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        font-weight: bold;
    }
</style>
