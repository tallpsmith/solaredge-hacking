const ROICalculator = require('./index.js')

const costs = {
    energyPrice: 30,
    feedInTariff: 10
}
const energy = {
    Production: 0,
    SelfConsumption: 100,
    FeedIn: 10,
    Purchased: 10,
    Consumption: 0
}
var days = 10;

var roiCalculator = new ROICalculator(costs, days);
var roi = roiCalculator.calculate(energy);
//console.log(roi);

test('Money Earned should be FeedInTarrif * FeedIn (expressed as $)', () => {
    expect(roi.moneyEarned).toBe(1);
});
test('Money Saved should be SelfConsumption * energyPrice (in $)', () => {
    expect(roi.moneySaved).toBe(30);
})

test('total ROI should be Money Saved + Money Earned', () => {
    expect(roi.totalValue).toBe(31);
})

test('Total energy costs (Imported) should be Purchased * Energy Costs', () => {
    expect(roi.energyCosts).toBe(3);
});

test('Average Return per day should be Total ROI divided by duration In days', () =>{
    expect(roi.averagePerDay).toBe(3.1);
})