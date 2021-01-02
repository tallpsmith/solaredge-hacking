const SolarEdgeAPI = require('./solaredgeapi/index.js');

const costs = {
    energyPrice: 29.5,
    feedInTariff: 10.2
}
var api = new SolarEdgeAPI('1978596', 'ZY1Z0BQ5692HFXCPL3CD3HB7P5HU4WEU', costs);
console.log(
    api.getROIData()
);
