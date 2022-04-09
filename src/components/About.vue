<template>
    <div>
        <div class="flex flex-row justify-center flex-nowrap mobile-one-col">
            <CardTile header="About this App" headerClass="text-3xl">
                <template v-slot:body>
                    I made this as a personal project to continue learning, house existing
                    and future projects, and enjoy hobby coding!
                    <CardTile header="Resume" :hoverGrow="false"
                        ><template v-slot:body> My web resume</template>
                    </CardTile>
                    <CardTile header="Chess" :hoverGrow="false"
                        ><template v-slot:body>
                            A player-vs-player chess application (in progress)</template
                        >
                    </CardTile>
                    <CardTile header="Cribbage" :hoverGrow="false"
                        ><template v-slot:body>
                            A points counter for the game of Cribbage (really in
                            progress)</template
                        >
                    </CardTile>
                </template>
            </CardTile>
            <CardTile header="About the Tech Stack" headerClass="text-3xl"
                ><template v-slot:body>
                    <CardTile header="Front End" :hoverGrow="false"
                        ><template v-slot:body>
                            <ul class="list-disc list-inside text-left">
                                <li>JavaScript</li>
                                <li>Vue.js Framework</li>
                                <li>Tailwind CSS Framework</li>
                                <li>Axios.js API Framework</li>
                            </ul></template
                        >
                    </CardTile>
                    <CardTile header="Back End - Python" :hoverGrow="false"
                        ><template v-slot:body>
                            <ul class="list-disc list-inside text-left">
                                <li>Python API Server</li>
                                <li>Pip Package Management</li>
                                <li>Flask API Framework</li>
                                <li>Gunicorn WSGI Server Framework</li>
                                <li>Postman for testing</li>
                            </ul></template
                        >
                    </CardTile>
                    <CardTile header="DevOps" :hoverGrow="false"
                        ><template v-slot:body>
                            <ul class="list-disc list-inside text-left">
                                <li>Git Source Control via GitHub</li>
                                <li>Hosting</li>
                                <li style="margin-left:2em">
                                    JS Front End
                                </li>
                                <li style="margin-left:4em">
                                    Auto deploy to Vercel via GitHub Actions
                                </li>
                                <li style="margin-left:2em">
                                    Python Back End
                                </li>
                                <li style="margin-left:4em">
                                    Auto deploy to Heroku via GitHub Actions
                                </li>
                            </ul></template
                        >
                    </CardTile></template
                >
            </CardTile>
        </div>
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
    @media only screen and (max-width: 650px) {
        .mobile-one-col {
            flex-wrap: wrap;
        }
        .mobile-one-col > div {
            flex-basis: 51% !important;
            flex-shrink: 0 !important;
            flex-grow: 1 !important;
        }
    }
</style>
