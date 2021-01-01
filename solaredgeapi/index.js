const axios = require('axios');

module.exports = class SolarEdgeAPI {
    constructor(siteId, apiKey) {
        this.siteId = siteId;
        this.apiKey = apiKey;
        this.startTime = '2020-12-23 00:00:00';
        this.endTime = '2021-01-02 00:00:00';
    }

    getROIData()  {
        axios.defaults.baseURL = `https://monitoringapi.solaredge.com/site/${this.siteId}`;
        var theEnergy = {
            Production: 0,
                SelfConsumption: 0,
                FeedIn:0,
                Purchased: 0,
                Consumption:0
        };
        //var calculate = this.calculate;
        var getResponseHandler = function (response) {
            //console.log(response);
            var meters = response.data.energyDetails.meters;
            meters.forEach(function (item, index) {
                theEnergy[item.type] = item.values[0].value / 1000; // all values in kWh
            });
            //calculate();
            console.log(theEnergy);
        };
        axios
            .get(`/energyDetails.json?api_key=${this.apiKey}&timeUnit=YEAR&startTime=${this.startTime}&endTime=${this.endTime}`)
            .then(getResponseHandler)
            .catch((error) => console.log(error));
    }
};