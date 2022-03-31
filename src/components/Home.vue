<template>
    <div class="p-10">
        <div class="flex flex-row justify-between mobile-one-col">
            <div
                class="flex flex-column justify-center items-center"
                style="flex-basis: 40%;"
            >
                <div
                    class="flex flex-col justify-center flex-nowrap text-6xl font-normal leading-normal mt-0 mb-1 p-2"
                    style="color: #60789e;"
                >
                    <div>Erik&nbsp;</div>
                    <div>Dietrich</div>
                    <div class="flex flex-row justify-around text-2xl">
                        <a
                            href="https://www.linkedin.com/in/erik-dietrich-000506134/"
                            target="_blank"
                        >
                            <i class="hover-grow cursor-pointer fab fa-linkedin" />
                        </a>
                        <a href="https://github.com/normalone7" target="_blank">
                            <i class="hover-grow cursor-pointer fab fa-github" />
                        </a>
                        <a href="https://hub.docker.com/u/normalone7" target="_blank">
                            <i class="hover-grow cursor-pointer fab fa-docker" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-0 mb-1 p-2 flex flex-row justify-center">
                <img src="../data/coverPhoto.jpeg" class="image-display" />
            </div>
            <div
                class="flex flex-col flex-grow justify-center items-stretch font-normal leading-normal mt-0 mb-1 p-2"
                style="color: #60789e"
            >
                <div class="text-left text-4xl ">Full stack engineering&nbsp;</div>
                <div class="text-center text-2xl"
                    >with focuses on process improvement and end-to-end user
                    experience</div
                >
            </div>
        </div>
        <div> </div>
        <div class="flex flex-row justify-center flex-nowrap mobile-one-col">
            <CardTile header="Full Stack Engineer" headerClass="text-3xl">
                Front and back end experience
            </CardTile>
            <CardTile header="Product Designer" headerClass="text-3xl">
                Creating solutions for complex business needs
            </CardTile>
            <CardTile header="Scrum Master" headerClass="text-3xl">
                Embedded Scrum Master on an Agile team
            </CardTile>
            <CardTile header="Project Manager" headerClass="text-3xl">
                Over 2 years project management experience
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
