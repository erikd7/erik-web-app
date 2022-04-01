<template>
    <div>
        <div class="flex flex-row justify-center flex-nowrap mobile-one-col">
            <CardTile header="About this App" headerClass="text-3xl">
                I made this as a personal project to continue learning, to house existing
                and future projects, and to have fun coding!
                <CardTile header="Resume" :hoverGrow="false">
                    My web resume
                </CardTile>
                <CardTile header="Chess" :hoverGrow="false">
                    A player-vs-player chess application
                </CardTile>
                <CardTile header="Cribbage" :hoverGrow="false">
                    A points counter for the game of Cribbage
                </CardTile>
                <CardTile header="About" :hoverGrow="false">
                    What you see is what you get
                </CardTile>
            </CardTile>
            <CardTile header="About the Tech Stack" headerClass="text-3xl">
                <CardTile header="Front End" :hoverGrow="false">
                    <ul class="list-disc list-inside text-left">
                        <li>JavaScript</li>
                        <li>Vue.js Framework</li>
                        <li>Tailwind CSS Framework</li>
                        <li>Axios.js API Framework</li>
                    </ul>
                </CardTile>
                <CardTile header="Back End - JS" :hoverGrow="false">
                    <ul class="list-disc list-inside text-left">
                        <li>Node.js Framework</li>
                        <li>npm Package Manager</li>
                    </ul>
                </CardTile>
                <CardTile header="Back End - Python" :hoverGrow="false">
                    <ul class="list-disc list-inside text-left">
                        <li>Python API Server</li>
                        <li>Pip Package Management</li>
                        <li>Flask API Framework</li>
                        <li>Waitress WSGI Server Framework</li>
                        <li>Postman for testing</li>
                    </ul>
                </CardTile>
                <CardTile header="DevOps" :hoverGrow="false">
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
                            Auto deploy Docker container to Heroku via GitHub Actions
                        </li>
                    </ul>
                </CardTile>
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
