<template>
    <div>
        <div class="header">
            Resume
        </div>
        <div>
            {{ resume.info.name }}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    resume: {
        type: Object,
        default: () => {},
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    font-weight: bold;
}
</style>
