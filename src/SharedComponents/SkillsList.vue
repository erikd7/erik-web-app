<template>
    <div>
        <div
            v-for="skill in sortedSkills"
            :key="skill.name"
            class="flex flex-row justify-between p-1"
        >
            <div class="flex-basis-10 flex justify-center">
                <i
                    v-for="(star, index) in new Array(skill.level)"
                    :key="index"
                    class="color-gold fas fa-star"
                    :title="levelTooltips[skill.level]"
                />
            </div>
            <div class="flex-basis-30 flex justify-center">
                <a class="list-info">{{ skill.name }}</a>
            </div>
            <div class="flex-basis-50 flex-grow flex justify-center">
                <a class="list-label">{{ skill.details }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import helpers from '../util/helpers';

    export default {
        data() {
            return {
                levelTooltips: {
                    1: 'Beginner',
                    2: 'Intermediate',
                    3: 'Proficient',
                },
            };
        },
        props: {
            skills: {
                type: Array,
                default: () => [],
            },
            sort: {
                type: Function,
                default: helpers.sortByKey,
            },
        },

        computed: {
            sortedSkills() {
                return this.sort(this.skills, 'level');
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .color-gold {
        color: #e9c400;
        font-size: 10px;
    }
    .flex-basis-10 {
        flex-basis: 10%;
    }
    .flex-basis-30 {
        flex-basis: 30%;
    }
    .flex-basis-50 {
        flex-basis: 50%;
    }
</style>
