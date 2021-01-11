const SolarEdgeAPI = require('./solaredgeapi/index.js');
const SufficientSolarChecker = require('./sufficientsolarchecker');
const ROICalculator = require('./roicalculator')

const costs = {
    energyPrice: 29.5,
    feedInTariff: 10.2
}
var api = new SolarEdgeAPI('1978596', 'ZY1Z0BQ5692HFXCPL3CD3HB7P5HU4WEU');
let sufficientSolarChecker = new SufficientSolarChecker();

api.currentPowerFlow().then((flow) => {
    console.log('Powerflow:' + JSON.stringify(flow, null, 2));
    api.getEnergyInfo().then((resolved,rejected) => {
        let energyInfo = resolved;
        var roiCalc = new ROICalculator(costs, energyInfo.duration);
        console.log('ROI:' + JSON.stringify(roiCalc.calculate(energyInfo.energy), null, 2));
        console.log('Ok to use High Powered Device?: ' + sufficientSolarChecker.isOkToUseHighPoweredDevices(energyInfo, flow));
    });

});



