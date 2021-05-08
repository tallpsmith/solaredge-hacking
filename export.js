require('dotenv').config();

const SolarEdgeAPI = require('./solaredgeapi/index.js');
const SufficientSolarChecker = require('./sufficientsolarchecker');
const ROICalculator = require('./roicalculator')

const moment = require('moment');

//https://github.com/rotaready/moment-range#iteration
//console.log(moment().startOf("Month"));

var api = new SolarEdgeAPI(process.env.SITE_ID, process.env.API_KEY);

api.getDetailedEnergyInfo().then((energyInfo) => {
    let headers = ['FeedIn', 'Production', 'Consumption', 'Purchased', 'SelfConsumption'];
    console.log(headers);
    Object.keys(energyInfo).forEach((key,index)=>{
        var row = [];
        row.push(key);
        headers.forEach((item)=>{
            let element = energyInfo[key][item];
            if(typeof element === "undefined"){
                element = 0;
            }
            row.push(element);
        });
        console.log(row);
    });
}).catch((error) =>{
    console.log(error);
})
