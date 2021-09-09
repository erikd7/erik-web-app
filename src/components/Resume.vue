<template>
    <div class="card-array">
        <!--New Column-->
        <div class="flex-grow-0 flex-shrink">
            <!--Photo-->
            <CardTile>
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
                        v-for="detail in contactDetails"
                        :key="detail.label"
                        class="flex flex-col"
                    >
                        <div class="list-label">{{ detail.label }}</div>
                        &nbsp;
                        <div class="list-info">{{ detail.info }}</div>
                    </div>
                </div>
            </CardTile>
        </div>
        <!--New Column-->
        <div class="flex-grow">
            <div v-for="(education, index) in educationList" :key="index">
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
                    studying
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
            </div>
            <CardTile header="Languages">
                <div>languages and frameworks</div>
            </CardTile>
            <CardTile header="Frameworks">
                <div>apps</div>
            </CardTile>
            <CardTile header="Development Apps">
                <div>experience - NM</div>
            </CardTile>
        </div>
        <!--New Column-->
        <div class="flex-grow">
            <CardTile header="Experience">
                <div>experience - NM</div>
            </CardTile>
            <CardTile>
                <div
                    >Software Developer and Project Manager, Epic Systems. As a
                    Software Developer: Led design and development of
                    customer-facing project management web app focusing on
                    optimization of customer decision-making processes. Used
                    SQL, C#, JS Vue, and HTML/CSS with GitLab source control.
                    Coordinated all parts of the SDLC, from initial scoping and
                    design through development, testing, go-live, and continuous
                    improvement. As a Project Manager: responsible for
                    configuring large-scale software suite for healthcare
                    organizations. Managed 20-member team. Member of Epic’s
                    Infection Control Product Leads team during the COVID-19
                    response.</div
                >
            </CardTile>
            <CardTile>
                <div>experience - duke</div>
            </CardTile>
            <CardTile>
                <div>honors</div>
            </CardTile>
            <CardTile>
                <div>links</div>
            </CardTile>
        </div>
    </div>
</template>

<script>
    import CardTile from '../SharedComponents/CardTile';

    export default {
        components: { CardTile },
        props: {
            resume: {
                type: Object,
                default: () => {},
            },
        },
        data() {
            return {
                contactDetails: [
                    {
                        label: 'email',
                        info: 'eb.dietrich11@gmail.com',
                    },
                    {
                        label: 'phone',
                        info: '(724) 799-4475',
                    },
                    {
                        label: 'location',
                        info: 'Madison, WI & Remote',
                    },
                ],
                educationList: [
                    {
                        institution: {
                            name: 'Virginia Tech',
                            location: 'Blacksburg, VA',
                        },
                        graduationYear: 2018,
                        degree: 'Bachelor of Science',
                        majors: ['Industrial and Systems Engineering'],
                        minors: ['Economics'],
                        distinction: 'Magna Cum Laude',
                    },
                ],
            };
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
        flex-wrap: nowrap;
        justify-content: space-evenly;
    }
    .card-array > div {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        flex-basis: 10%;
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
</style>
