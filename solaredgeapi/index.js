const AXIOS = require('axios');
const moment = require('moment');

module.exports = class SolarEdgeAPI {
    constructor(siteId, apiKey) {
        this.siteId = siteId;
        this.apiKey = apiKey;
        this.startTime = '';
        this.endTime = '';
        this.durationInDays = 0;
        this.axios = AXIOS.create({
            baseURL: `https://monitoringapi.solaredge.com/site/${this.siteId}`
        });
    }

    currentPowerFlow() {
        const powerFlow = {
            state: 'importing',
            power: 0
        };
        return this.axios.get(`/currentPowerFlow.json?api_key=${this.apiKey}`)
            .then((response) => {
                response.data.siteCurrentPowerFlow.connections.forEach((item) => {
                    if (item.from == 'LOAD' && item.to == 'Grid') {
                        powerFlow.state = 'exporting'
                    }
                });
                powerFlow.power = response.data.siteCurrentPowerFlow.GRID.currentPower;
                //console.log(powerFlow);
                return powerFlow;
            }
            ).catch((error) => console.log(error));
    }

    getEnergyInfo() {
        var energyInfo = {
            duration: 0,
            energy: {
                Production: 0,
                SelfConsumption: 0,
                FeedIn: 0,
                Purchased: 0,
                Consumption: 0
            }
        }

        this.axios.get(`/dataPeriod.json?api_key=${this.apiKey}`)
            .then((response) => {
                var period = response.data.dataPeriod;
                this.startTime = period.startDate + ' 00:00:00';
                this.endTime = period.endDate + ' 23:59:59';
                energyInfo.duration = moment.duration(moment(this.endTime).diff(moment(this.startTime))).asDays();
            })
            .catch((error) => console.log(error));

        return this.axios
            .get(`/energyDetails.json?api_key=${this.apiKey}&timeUnit=YEAR&startTime=${this.startTime}&endTime=${this.endTime}`)
            .then((response) => {
                var meters = response.data.energyDetails.meters;
                meters.forEach(function (item) {
                    var total = 0;
                    item.values.forEach((item, index) => total += item.value / 1000); // TODO need to be sure of the Units are still "Wh"
                    energyInfo.energy[item.type] = total;
                });
                //console.log(energyInfo);
                return energyInfo;
            })
            .catch((error) => console.log(error));
    }


};