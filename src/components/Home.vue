<template>
    <div>
        <div class="flex flex-row justify-center">
            <CardTile header="About Me" headerClass="text-3xl">
                I am a full-stack developer based in Madison, WI.
                <CardTile header="Why did I make this app?" :hoverGrow="false">
                    This is a personal project I've been working on
                    intermittently since about June 2021.
                </CardTile>
                <CardTile header="What's next for this app?" :hoverGrow="false">
                    Finish Cribbage points counter, continue to build out Chess
                    app, and deploy to public domain.
                </CardTile>
            </CardTile>
            <CardTile header="About this App" headerClass="text-3xl">
                <CardTile header="Resume" :hoverGrow="false">
                    My web resume
                </CardTile>
                <CardTile header="Chess" :hoverGrow="false">
                    A player-vs-player chess application
                </CardTile>
                <CardTile header="Cribbage" :hoverGrow="false">
                    A points counter for the game of Cribbage
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
                        <li>Postman for testing</li>
                    </ul>
                </CardTile>
                <CardTile header="DevOps" :hoverGrow="false">
                    <ul class="list-disc list-inside text-left">
                        <li>Git Source Control</li>
                        <li>GitHub Repo Hosting</li>
                        <li>Docker Runtime</li>
                        <li style="margin-left:2em"
                            >2 images/containers - 1 for JS, 1 for Python</li
                        >
                        <li style="margin-left:2em"
                            >Automated Docker Image build using GitHub
                            Actions</li
                        >
                        <li>Self-hosted on Synology Server</li>
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
</style>
