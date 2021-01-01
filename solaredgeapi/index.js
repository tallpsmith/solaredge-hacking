const AXIOS = require('axios');

module.exports = class SolarEdgeAPI {
    constructor(siteId, apiKey) {
        this.siteId = siteId;
        this.apiKey = apiKey;
        this.startTime = '';
        this.endTime = '';
        this.axios = AXIOS.create({
            baseURL: `https://monitoringapi.solaredge.com/site/${this.siteId}`
        });
        this.axios.get(`/dataPeriod.json?api_key=${this.apiKey}`)
            .then((response) => {
                var period = response.data.dataPeriod;
                this.startTime = period.startDate + ' 00:00:00';
                this.endTime = period.endDate + ' 23:59:59';
            });

    }

    getROIData(callback) {
        var theEnergy = {
            Production: 0,
            SelfConsumption: 0,
            FeedIn: 0,
            Purchased: 0,
            Consumption: 0
        };
        return this.axios
            .get(`/energyDetails.json?api_key=${this.apiKey}&timeUnit=YEAR&startTime=${this.startTime}&endTime=${this.endTime}`)
            .then((response) => {
                var meters = response.data.energyDetails.meters;
                meters.forEach(function (item, index) {
                    var total = 0;
                    item.values.forEach((item, index) => total += item.value / 1000); // TODO need to be sure of the Units are still "Wh"
                    theEnergy[item.type] = total;
                });
                return theEnergy;
            })
            .then(callback)
            .catch((error) => console.log(error));
    }
};