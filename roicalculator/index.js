
module.exports = class ROICalculator {
    constructor(costs, durationInDays){
        this.costs = costs;
        this.durationInDays = durationInDays;
    }

    calculate(energyInfo){
        var roi = {};
        roi.moneyEarned =  energyInfo.FeedIn * this.costs.feedInTariff /100; // measured in $
        roi.moneySaved = energyInfo.SelfConsumption * this.costs.energyPrice / 100;
        roi.totalValue = roi.moneySaved + roi.moneyEarned;
        roi.energyCosts = (energyInfo.Purchased * this.costs.energyPrice) / 100;
        roi.averagePerDay = roi.totalValue / this.durationInDays;
        return roi;
    };
};