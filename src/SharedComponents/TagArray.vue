<template>
    <div class="flex flex-row flex-wrap justify-left">
        <Tag
            v-for="(item, index) in array"
            :key="index"
            :label="item[labelKey]"
            :tooltip="item[tooltipKey]"
        />
    </div>
</template>

<script>
    import Tag from './Tag';

    export default {
        components: { Tag },
        data() {
            return {};
        },
        props: {
            array: {
                type: Array,
                default: () => [],
            },
            labelKey: {
                type: String,
                default: 'label',
            },
            tooltipKey: {
                type: String,
                default: 'tooltip',
            },
        },
    };
</script>
