const SolarEdgeAPI = require('./solaredgeapi/index.js');
const ROICalculator = require('./roicalculator')

const costs = {
    energyPrice: 29.5,
    feedInTariff: 10.2
}
var api = new SolarEdgeAPI('1978596', 'ZY1Z0BQ5692HFXCPL3CD3HB7P5HU4WEU');

api.currentPowerFlow().then((flow) => console.log(flow));

api.getEnergyInfo().then((resolved,rejected) => {
    let energyInfo = resolved;
    //console.log(energyInfo);
    var roiCalc = new ROICalculator(costs, energyInfo.duration);
    console.log(roiCalc.calculate(energyInfo.energy));
})
