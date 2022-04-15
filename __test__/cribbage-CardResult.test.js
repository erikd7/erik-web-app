import { helpers, CardResult } from '../src/util/pointsCounterHelpers';

describe('should correctly total cribbage points', () => {
    it('should correctly get face for card', () => {
        const face = helpers.getFaceForCard('QH');
        expect(face).toBe('Q')
    })

    it('should correctly get face for card - 10', () => {
        const face = helpers.getFaceForCard('10D');
        expect(face).toBe('10')
    })

    it('should correctly create a card face map', () => {
        const cardsFaceMap = helpers.getCardHash(['7', '5', '5', '6', '8']);
        expect(cardsFaceMap).toEqual({5: [1,2], 6: [3], 7: [0], 8: [4] })
    })

    it('should get run cards and points - no runs', () => {
        const cardsResult = CardResult.build(['AH', '3S', '5S', '7S', '9S']);
        cardsResult.getRunPoints();
        expect(cardsResult.runs.cards).toMatchObject([])
        expect(cardsResult.runs.points).toBe(0)
    })

    it('should get run cards and points - one run', () => {
        const cardsResult = CardResult.build(['AS', '9D', '2C', 'JC', '10C']);
        cardsResult.getRunPoints();
        expect(cardsResult.runs.cards).toMatchObject([['9D', '10C', 'JC']])
        expect(cardsResult.runs.points).toBe(3)
    })

    it('should get run cards and points - duplicate runs', () => {
        const cardsResult = CardResult.build(['7S', '5S', '5D', '6S', '8S']);
        cardsResult.getRunPoints();
        expect(cardsResult.runs.cards).toMatchObject([['5S', '6S', '7S', '8S'],['5D', '6S', '7S', '8S']])
        expect(cardsResult.runs.points).toBe(8)
    })

    it('should get run cards and points - double duplicate runs', () => {
        const cardsResult = CardResult.build(['7D', '5D', '5S', '6S', '7S']);
        cardsResult.getRunPoints();
        expect(cardsResult.runs.cards).toMatchObject([['5D', '6S', '7D'],['5D', '6S', '7S'],['5S', '6S', '7D'],['5S', '6S', '7S']])
        expect(cardsResult.runs.points).toBe(12)
    })

    it('should get pair cards and points - no pairs', () => {
        const cardsResult = CardResult.build(['AC', '2C', '3C', '4D', '5S']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([])
        expect(cardsResult.pairs.points).toBe(0)
    })

    it('should get pair cards and points - one pair', () => {
        const cardsResult = CardResult.build(['AS', '2C', '3S', '4D', '3D']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([['3S','3D']])
        expect(cardsResult.pairs.points).toBe(2)
    })

    it('should get pair cards and points - two separate pairs', () => {
        const cardsResult = CardResult.build(['AS', '2D', '3C', 'AD', '3S']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([['3C','3S'],['AS', 'AD']])
        expect(cardsResult.pairs.points).toBe(4)
    })

    it('should get pair cards and points - two separate pairs and dup pair', () => {
        const cardsResult = CardResult.build(['AS', '3D', '3C', 'AF', '3S']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([['3D', '3C', '3S'], ['AS','AF']])
        expect(cardsResult.pairs.points).toBe(8)
    })

    it('waysToSum should work - simple', () => {
        const result = helpers.waysToSum([{card: 1, value: 1},{card: 2, value: 2},{card: 3, value: 3}], 3)
        expect(result).toMatchObject([[1,2],[3]])
    })

    it('waysToSum should work - more complex', () => {
        const result = helpers.waysToSum([{card: 1, value: 1}, {card: 1, value: 1}, {card: 2, value: 2}], 3)
        expect(result).toMatchObject([[1,2],[1,2]])
    })

    it('should get sum cards and points - no sums', () => {
        const cardsResult = CardResult.build(['AS', '3F', '3D', 'AS', '3C']);
        cardsResult.getPairPoints();
        expect(cardsResult.sums.cards).toMatchObject([])
        expect(cardsResult.sums.points).toBe(0)
    })

    it('should get sum cards and points - one sum', () => {
        const cardsResult = CardResult.build(['6C', 'QC', 'QD', 'QH', '9D']);
        cardsResult.getSumPoints();
        expect(cardsResult.sums.cards).toMatchObject([['6C','9D']])
        expect(cardsResult.sums.points).toBe(2)
    })

    it('should get sum cards and points - two sums', () => {
        const cardsResult = CardResult.build(['6D', 'QS', '2S', '5C', '9D']);
        cardsResult.getSumPoints();
        expect(cardsResult.sums.cards).toMatchObject([['6D','9D'],['QS','5C']])
        expect(cardsResult.sums.points).toBe(4)
    })

    it('should get sum cards and points - three sums', () => {
        const cardsResult = CardResult.build(['6D', '10S', '6S', '5D', '9C']);
        cardsResult.getSumPoints();
        expect(cardsResult.sums.cards).toMatchObject([['6D','9C'],['10S','5D'],['6S','9C']])
        expect(cardsResult.sums.points).toBe(6)
    })

    it('should correctly calculate full point total', () => {
        const cardsResult = CardResult.build(['AC', '3C', '3D', '6S', '3S']);
        cardsResult.calculatePoints();
        expect(cardsResult.totalPoints).toBe(8)
    })

    it('should correctly calculate full point total - max points', () => {
        const cardsResult = CardResult.build(['JF', '5H', '5H', '5H', '5D']);
        cardsResult.calculatePoints();
        expect(cardsResult.totalPoints).toBe(28)
    })

    it('should correctly calculate full point total - max points - different order', () => {
        const cardsResult = CardResult.build(['5D', '5S', 'JC', '5H', '5S']);
        cardsResult.calculatePoints();
        expect(cardsResult.totalPoints).toBe(28)
    })
})