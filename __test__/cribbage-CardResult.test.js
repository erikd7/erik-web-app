import { helpers, CardResult } from '../src/util/pointsCounterHelpers';

describe('should correctly total cribbage points', () => {
    it('should correctly create a card face map', () => {
        const cardsFaceMap = helpers.createCardHash(['7', '5', '5', '6', '8']);
        expect(cardsFaceMap).toEqual({5: [1,2], 6: [3], 7: [0], 8: [4] })
    })

    it('should get run cards and points - no runs', () => {
        const cardsResult = CardResult.build(['A', '3', '5', '7', '9']);
        cardsResult.getRunPoints();
        expect(cardsResult.runs.cards).toMatchObject([])
        expect(cardsResult.runs.points).toBe(0)
    })

    it('should get run cards and points - one run', () => {
        const cardsResult = CardResult.build(['A', '9', '2', 'J', '10']);
        cardsResult.getRunPoints();
        expect(cardsResult.runs.cards).toMatchObject([['9', '10', 'J']])
        expect(cardsResult.runs.points).toBe(3)
    })

    it('should get run cards and points - duplicate runs', () => {
        const cardsResult = CardResult.build(['7', '5', '5', '6', '8']);
        cardsResult.getRunPoints();
        expect(cardsResult.runs.cards).toMatchObject([['5', '6', '7', '8'],['5', '6', '7', '8']])
        expect(cardsResult.runs.points).toBe(8)
    })

    it('should get pair cards and points - no pairs', () => {
        const cardsResult = CardResult.build(['A', '2', '3', '4', '5']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([])
        expect(cardsResult.pairs.points).toBe(0)
    })

    it('should get pair cards and points - one pair', () => {
        const cardsResult = CardResult.build(['A', '2', '3', '4', '3']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([{3:2}])
        expect(cardsResult.pairs.points).toBe(2)
    })

    it('should get pair cards and points - two separate pairs', () => {
        const cardsResult = CardResult.build(['A', '2', '3', 'A', '3']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([{3:2}, {A:2}])
        expect(cardsResult.pairs.points).toBe(4)
    })

    it('waysToSum should work - simple', () => {
        const result = helpers.waysToSum([1,2,3], 3)
        expect(result).toMatchObject([[1,2],[3]])
    })

    it('waysToSum should work - more complex', () => {
        const result = helpers.waysToSum([1,1,2], 3)
        expect(result).toMatchObject([[1,2],[1,2]])
    })

    it('waysToSum should work - more complex', () => {
        const result = helpers.waysToSum([1,1,2], 3)
        expect(result).toMatchObject([[1,2],[1,2]])
    })

    it('should get pair cards and points - two separate pairs and dup pair', () => {
        const cardsResult = CardResult.build(['A', '3', '3', 'A', '3']);
        cardsResult.getPairPoints();
        expect(cardsResult.pairs.cards).toMatchObject([{3:3}, {A:2}])
        expect(cardsResult.pairs.points).toBe(8)
    })

    it('should get sum cards and points - no sums', () => {
        const cardsResult = CardResult.build(['A', '3', '3', 'A', '3']);
        cardsResult.getPairPoints();
        expect(cardsResult.sums.cards).toMatchObject([])
        expect(cardsResult.sums.points).toBe(0)
    })

    it('should get sum cards and points - one sum', () => {
        const cardsResult = CardResult.build(['6', 'Q', 'Q', 'Q', '9']);
        cardsResult.getSumPoints();
        expect(cardsResult.sums.cards).toMatchObject([[6,9]])
        expect(cardsResult.sums.points).toBe(2)
    })

    it('should get sum cards and points - two sums', () => {
        const cardsResult = CardResult.build(['6', '10', '2', '5', '9']);
        cardsResult.getSumPoints();
        expect(cardsResult.sums.cards).toMatchObject([[6,9],[10,5]])
        expect(cardsResult.sums.points).toBe(4)
    })

    it('should get sum cards and points - three sums', () => {
        const cardsResult = CardResult.build(['6', '10', '6', '5', '9']);
        cardsResult.getSumPoints();
        expect(cardsResult.sums.cards).toMatchObject([[6,9],[10,5],[6,9]])
        expect(cardsResult.sums.points).toBe(6)
    })

    it('should correctly calculate full point total', () => {
        const cardsResult = CardResult.build(['A', '3', '3', '6', '3']);
        cardsResult.calculatePoints();
        expect(cardsResult.totalPoints).toBe(8)
    })

    it('should correctly calculate full point total - max points', () => {
        const cardsResult = CardResult.build(['J', '5', '5', '5', '5']);
        cardsResult.calculatePoints();
        expect(cardsResult.totalPoints).toBe(28)
    })

    it('should correctly calculate full point total - max points - different order', () => {
        const cardsResult = CardResult.build(['5', '5', 'J', '5', '5']);
        cardsResult.calculatePoints();
        expect(cardsResult.totalPoints).toBe(28)
    })
})