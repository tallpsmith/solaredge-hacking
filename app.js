require('dotenv').config();

var express = require('express');

const SolarEdgeAPI = require('./solaredgeapi/index.js');
const SufficientSolarChecker = require('./sufficientsolarchecker');
const ROICalculator = require('./roicalculator')

var app = express();
const port = 8080;


const costs = {
    energyPrice: 29.5,
    feedInTariff: 10.2
}

var api = new SolarEdgeAPI(process.env.SITE_ID, process.env.API_KEY);
let sufficientSolarChecker = new SufficientSolarChecker();

app.get('/solarEdge/roi', (req, res) => {
    api.getEnergyInfo().then((resolved) => {
            let energyInfo = resolved;
            var roiCalc = new ROICalculator(costs, energyInfo.duration);
            res.status(200).json(roiCalc.calculate(energyInfo.energy));
        }
    ).catch((error) => {
        console.log(error);
    });
});

app.get('/solarEdge/highPowered', (req, res) => {
    api.currentPowerFlow().then((flow) => {
        res.status(200).json({
            'isOkToUseHighPoweredDevices': sufficientSolarChecker.isOkToUseHighPoweredDevices(flow),
            'flow': flow,
        });
    });
});

app.listen(port, () => {
    console.log("Welcome to SolarEdge! on port " + port);
});