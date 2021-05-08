require('dotenv').config();

const SolarEdgeAPI = require('./solaredgeapi/index.js');
const ROICalculator = require('./roicalculator')

const costs = {
    energyPrice: 29.5,
    feedInTariff: 10.2
}

var api = new SolarEdgeAPI(process.env.SITE_ID, process.env.API_KEY);

api.getEnergyInfo().then((resolved) => {
    let energyInfo = resolved;
    var roiCalc = new ROICalculator(costs, energyInfo.duration);
    console.log('ROI:' + JSON.stringify(roiCalc.calculate(energyInfo.energy), null, 2));
}).catch((error) => {
    console.log(error);
});
