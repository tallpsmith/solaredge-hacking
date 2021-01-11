const SufficientSolarChecker = require('./index.js')

const energy = {
    Production: 0,
    SelfConsumption: 100,
    FeedIn: 10,
    Purchased: 10,
    Consumption: 0
}

const goodPowerflow = {
    "state": "exporting",
    "power": 2.5
}

const badPowerflow1 = {
    "state": "importing",
    "power": 2.5
}

const badPowerflow2 = {
    "state": "exporting",
    "power": 1.0
}

const sufficientsolarchecker = new SufficientSolarChecker();

test('Should be ok to use a high powered device if we are exporting and powerflow is >2', ()=>{
    expect(sufficientsolarchecker.isOkToUseHighPoweredDevices(energy, goodPowerflow)).toBe(true);
});

test('Should NOT be ok to use high powered device if we are importing energy', ()=>{
    expect(sufficientsolarchecker.isOkToUseHighPoweredDevices(energy, badPowerflow1)).toBe(false);
});

test('Should NOT be ok to use high powered device if we are not exporting enough energy', ()=>{
    expect(sufficientsolarchecker.isOkToUseHighPoweredDevices(energy, badPowerflow2)).toBe(false);
});