require('dotenv').config();

const SolarEdgeAPI = require('./solaredgeapi/index.js');
const SufficientSolarChecker = require('./sufficientsolarchecker');

var api = new SolarEdgeAPI(process.env.SITE_ID, process.env.API_KEY);
let sufficientSolarChecker = new SufficientSolarChecker();

api.currentPowerFlow().then((flow) => {
    console.log('Powerflow:' + JSON.stringify(flow, null, 2));
    return flow;
}).then((flow)=>{
    api.getEnergyInfo().then((resolved) => {
        let energyInfo = resolved;
        console.log('Ok to use High Powered Device?: ' + sufficientSolarChecker.isOkToUseHighPoweredDevices(flow));
    });
}).catch((error)=>{
    console.log(error);
});




