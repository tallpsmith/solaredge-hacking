

module.exports = class SufficientSolarChecker{

    isOkToUseHighPoweredDevices(powerflow) {
        if(powerflow.state === 'exporting'){
            if(powerflow.power > 2.0){
                return true;
            }
        }
        return false;
    }
}