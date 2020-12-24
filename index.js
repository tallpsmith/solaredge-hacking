var app = new Vue({
    el: '#app',
    data() {
        return {
            response: '',
            siteId: 1978596,
            APIKey: 'ZY1Z0BQ5692HFXCPL3CD3HB7P5HU4WEU',
            meters: {}
        }
    },
    mounted() {
        axios
            .get(`https://monitoringapi.solaredge.com/site/${this.siteId}/energyDetails?timeUnit=YEAR&startTime=2019-12-23%2000:00:00&endTime=2020-12-29%2000:00:00&api_key=${this.APIKey}`)
            .then(response => (this.meters = response.data.energyDetails.meters));
    }
});