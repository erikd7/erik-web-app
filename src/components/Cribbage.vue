<template>
    <div>
        <div class="header">
            Cribbage Points Counter
        </div>
        <div>
            <button @click="calculatePoints()">
                Total Points
            </button>
        </div>
        <div v-if="totalPoints"> Total Points is {{ totalPoints }} </div>
        <div>
            Points Breakdown:
        </div>
        <div v-if="cardsResult.pairs">
            Points from Pairs:
            <PointsSummary label="Pair" :cards="cardsResult.pairs" />
        </div>
    </div>
</template>

<script>
    import PointsSummary from './PointsSummary.vue';
    import helpers from '../util/pointsCounterHelpers';

    export default {
        components: { PointsSummary },
        props: {
            resume: {
                type: Object,
                default: () => {},
            },
        },
        data() {
            return {
                cardValues: [8, 5, 5, 5, 6, 7, 8, 9],
                cardFaces: ['8', '2', '5', '5', '5', '6', '7', '8', 'J'],
                total: 15,
                totalPoints: 0,
                cardsResult: {},
            };
        },
        methods: {
            calculatePoints() {
                //this.getSumPoints(this.cardValues, this.total)
                //const cardsValueMap = this.createCardHash(this.cardValues)
                const cardsFaceMap = helpers.createCardHash(this.cardFaces);
                //this.getPairPoints(cardsFaceMap);
                this.getRunPoints(cardsFaceMap);
            },
            getPairPoints(cardsMap) {
                let numCombos = 0;
                Object.values(cardsMap).forEach(
                    p => (numCombos += helpers.getNumCombos(p))
                );
                let pairCards = [];
                Object.keys(cardsMap).forEach(key => {
                    const numCards = cardsMap[key].length;
                    if (numCards >= 2) {
                        let toPush = {};
                        toPush[key] = numCards;
                        pairCards.push(toPush);
                    }
                });
                this.totalPoints += 2 * numCombos;
                this.cardsResult.pairs = pairCards;
            },
            getRunPoints(cardsMap) {
                let runs = {};
                let starterCard = 'x';
                console.log('cardsmap is', cardsMap);
                //Loop through facecards and check for next in sequence
                helpers.orderedFaces.forEach(face => {
                    const cardInHand = cardsMap[face];

                    if (cardInHand) {
                        if (starterCard === 'x') {
                            //If it's first in a sequence
                            starterCard = face;
                            runs[face] = [face];
                        } else {
                            //If part of existing sequence
                            runs[starterCard].push(face);
                        }
                    } else {
                        //
                        starterCard = 'x';
                    }
                });
                console.log('runs is', runs);

                this.totalPoints += 2 * numCombos;
                this.cardsResult.pairs = pairCards;
            },
            /*getSumPoints(cards, target, cardsMap) {
        console.log('cards map is ', cardsMap, target   )
        for (const topCardIndex in cards) {
            const topCard = cards[topCardIndex]
            console.log('topcardindex is', topCardIndex)
            console.log('cards is', cards)
            console.log('sliced cards is', cards.slice(topCardIndex + 1))
            for (const nextCardIndex in cards.slice(topCardIndex + 1)) {
                const nextCard = cards[nextCardIndex]
            }
        }
      },*/
            cardsToFaceValues() {},
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        font-weight: bold;
    }
</style>
