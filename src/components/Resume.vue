<template>
    <div>
        <LoadingOrError
            v-if="loadingMessage || errorMessage"
            :loadingMessage="loadingMessage"
            :errorMessage="errorMessage"
        />
        <div v-else class="card-array">
            <!--New Column-->
            <div class="flex-grow flex-shrink-0">
                <!--Photo-->
                <CardTile class="flex-grow-0-imp">
                    <div class="flex-container flex justify-center">
                        <div>
                            <img
                                src="../data/coverPhoto.jpeg"
                                class="image-display"
                            />
                        </div>
                    </div>
                </CardTile>
                <!--Contact Info-->
                <CardTile header="Contact Information">
                    <div class="flex flex-col">
                        <div
                            v-for="detail in resumeInfo.contactDetails"
                            :key="detail.label"
                            class="flex flex-col"
                        >
                            <div class="list-label">{{ detail.label }}</div>
                            <div class="list-info">
                                <a
                                    v-if="detail.label === 'email'"
                                    class="link"
                                    :href="`mailto:${detail.info}`"
                                >
                                    {{ detail.info }}
                                </a>
                                <a v-else>
                                    {{ detail.info }}
                                </a>
                            </div>
                        </div>
                    </div>
                </CardTile>
                <CardTile header="Links">
                    <div
                        v-for="link in resumeInfo.links"
                        :key="link.title"
                        class="flex flex-col"
                    >
                        <div>
                            <a class="link" :href="link.url" target="_blank">{{
                                link.title
                            }}</a>
                        </div>
                    </div>
                </CardTile>
            </div>
            <!--New Column-->
            <div class="flex-grow-fast flex-shrink-0">
                <!--Skills-->
                <CardTile header="Core Skills">
                    <SkillsList
                        :skills="resumeInfo.skillsCore"
                        :sort="skills => skills"
                    ></SkillsList>
                </CardTile>
                <CardTile header="Additional Skills">
                    <SkillsList
                        :skills="resumeInfo.skillsAdditional"
                    ></SkillsList>
                </CardTile>
            </div>
            <!--New Column-->
            <div class="flex-grow-fast flex-shrink-0">
                <!--Education-->
                <span
                    v-for="(education, index) in resumeInfo.educationList"
                    :key="index"
                >
                    <CardTile>
                        <div class="card-header">
                            <a class="font-bold">
                                {{ education.institution.name }}
                            </a>
                            <a class="text-sm">
                                class of
                            </a>
                            <a class="font-bold">
                                {{ education.graduationYear }}
                            </a>
                        </div>
                        <div>
                            {{ education.degree }}
                            <a v-if="education.distinction" class="text-sm">
                                with
                            </a>
                            <a>
                                {{ education.distinction }}
                            </a>
                        </div>
                        <div
                            v-for="(focus, index) in education.majors.concat(
                                education.minors
                            )"
                            :key="index"
                        >
                            <div>
                                {{ focus }}
                            </div>
                        </div>
                    </CardTile>
                </span>
                <!--Experience-->
                <span
                    v-for="(experience, index) in resumeInfo.experienceList"
                    :key="index"
                >
                    <CardTile
                        :header="
                            `${experience.title}, ${experience.organization}`
                        "
                        :subHeader="
                            `${experience.start} — ${experience.end ||
                                'present'}`
                        "
                    >
                        <div class="text-left">{{
                            experience.description
                        }}</div>
                    </CardTile>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import CardTile from '../SharedComponents/CardTile';
    import SkillsList from '../SharedComponents/SkillsList';
    import LoadingOrError from '../SharedComponents/LoadingOrError';
    import * as api from '../util/apis';

    export default {
        components: { CardTile, SkillsList, LoadingOrError },
        props: {
            resume: {
                type: Object,
                default: () => {},
            },
        },
        data() {
            return {
                resumeInfo: {},
                loadingMessage: '',
                errorMessage: '',
            };
        },
        created() {
            this.loadingMessage = 'Loading resume info';
            api.resumeInfo
                .get()
                .then(response => {
                    if (response.ok) {
                        this.resumeInfo = response.data;
                    } else {
                        this.errorMessage = response.message;
                    }
                })
                .catch(error => {
                    this.errorMessage = `Failed to retrieve resume info with: ${JSON.stringify(
                        error.message
                    )}`;
                })
                .finally(() => {
                    this.loadingMessage = null;
                });
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        font-weight: bold;
    }
    .card-array {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .card-array > div {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        flex-basis: 200px;
    }
    .card-array > div > div {
        flex-grow: 1;
    }
    .image-display {
        border-radius: 10px;
        width: 300px;
    }
    .list-label {
        font-size: small;
    }
    .list-info {
        font-weight: bold;
    }
    .flex-grow-0-imp {
        flex-grow: 0 !important;
    }
    .flex-grow-fast {
        flex-grow: 3;
    }
</style>
