<template>
    <div class="card-array">
        <CardTile class="header">
            <div class="flex-container flex justify-center">
                <div>
                    <img src="../data/coverPhoto.jpeg" class="image-display" />
                </div>
            </div>
        </CardTile>
        <CardTile>
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
        <CardTile class="header">
            <div>educational info</div>
        </CardTile>
        <CardTile class="header">
            <div>languages and frameworks</div>
        </CardTile>
        <CardTile class="header">
            <div>apps</div>
        </CardTile>
        <CardTile class="header">
            <div>experience - NM</div>
        </CardTile>
        <CardTile class="header">
            <div>experience - Epic</div>
        </CardTile>
        <CardTile class="header">
            <div>experience - duke</div>
        </CardTile>
        <CardTile class="header">
            <div>honors</div>
        </CardTile>
        <CardTile class="header">
            <div>links</div>
        </CardTile>
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
        flex-wrap: wrap;
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
