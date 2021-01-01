Vue.filter('currency', function(value){
    let val = (value/1).toFixed(2).replace('.', '.')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
});


/*
TODO

* Get the start date of the site and calculate # days since
* Calculate ROI/day average
* Don't do the Net ROI thing, because that was always money we would have spent
* Calculate Export versus Import Ratio
* Layout in nice panels with Percentages and other units
* handle multi-year
* Plot a weekly/monthly graph of ROI ?
* Detailed percentile breakdown of Energy Production
* Perhaps Seasonal view (don't forget Northern Hemisphere)
*/
var vue = new Vue({
    el: '#app',
    data() {
        return {
            solarEdge: {
                siteId: 1978596,
                APIKey: 'ZY1Z0BQ5692HFXCPL3CD3HB7P5HU4WEU',
            },
            queryParams:{
                startTime: '2020-01-01 00:00:00',
                endTime: '2020-12-31 00:00:00',
            },
            investment: 9499,
            costs: {
                energyPrice: 29.5,
                feedInTariff: 10.2
            },
            energy: {
                Production: 0,
                SelfConsumption: 0,
                FeedIn:0,
                Purchased: 0,
                Consumption:0
            },
            ROI: {
                energyCosts: 0,
                moneySaved: 0,
                moneyEarned: 0,
                totalValue: 0,
                totalReturn: 0
            }
        }
    },
    methods:{
        calculate(){
            this.ROI.moneyEarned =  this.energy.FeedIn * this.costs.feedInTariff /100; // measured in $
            this.ROI.moneySaved = this.energy.SelfConsumption * this.costs.energyPrice / 100;
            this.ROI.totalValue = this.ROI.moneySaved + this.ROI.moneyEarned;
            this.ROI.energyCosts = (this.energy.Purchased * this.costs.energyPrice) / 100;
            this.ROI.totalReturn = this.ROI.totalValue - this.ROI.energyCosts;
      }
    },
    mounted() {
        axios.defaults.baseURL = `https://monitoringapi.solaredge.com/site/${this.solarEdge.siteId}`;
        var theEnergy = this.energy;
        var calculate = this.calculate;
        getResponseHandler = function(response) {
            //console.log(response);
            var meters = response.data.energyDetails.meters;
            meters.forEach(function(item,index){
                theEnergy[item.type] = item.values[0].value /1000; // all values in kWh
            });
            calculate();
        };
        axios
            .get(`/energyDetails?api_key=${this.solarEdge.APIKey}&timeUnit=YEAR&startTime=${this.queryParams.startTime}&endTime=${this.queryParams.endTime}`)
            .then(getResponseHandler);
    }
});

