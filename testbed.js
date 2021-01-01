const SolarEdgeAPI = require('./solaredgeapi/index.js');

var api = new SolarEdgeAPI('1978596', 'ZY1Z0BQ5692HFXCPL3CD3HB7P5HU4WEU');

api.getROIData();