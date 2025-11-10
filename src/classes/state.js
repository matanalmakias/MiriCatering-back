export class State {
  constructor() {
    this.currentRoiThreshold = 0;
    this.roiTarget = 0;
    this.roiStepThreshold = 0;
    this.qtyToSell = 0;
    this.connection = null;
    this.noCurrencyToSell = true;
    this.isReseting = false;
    this.isResetingBuySystem = false;
    this.isBusy = false;
    this.currentMarkPrice = 0;
    this.isStartingToSell = false;
    this.avgPrice = 0;
    this.symbol = "";
  }

  setState(key, value, noLog = false) {
    if (!(key in this)) {
      console.error(`❌ ${this.symbol} --  [setState] Invalid key: ${key}`);
      return;
    }
    this[key] = value;
    if (!noLog) {
      console.log(
        `✅ ${this.symbol} --  [setState] ${String(key)} updated to: ${value}`
      );
    }
  }

  setROIStepThreshold(newVariable) {
    this.roiStepThreshold = newVariable;
    console.log(
      `✅ ${this.symbol} --   [setROIStepThreshold] roiStepThreshold updated to: ${newVariable}`
    );
  }

  setROITarget(newVariable) {
    this.roiTarget = newVariable;
    console.log(
      `✅ ${this.symbol} --   [setROITarget] roiTarget updated to: ${newVariable}`
    );
  }

  setCurrentRoiThreshold(newVariable) {
    this.currentRoiThreshold = newVariable;
    console.log(
      `✅ ${this.symbol} --   [setCurrentRoiThreshold] currentRoiThreshold updated to: ${newVariable}`
    );
  }

  setNoCurrencyToSell(newVariable) {
    this.noCurrencyToSell = newVariable;
    console.log(
      `✅ ${this.symbol} --   [setNoCurrencyToSell] noCurrencyToSell updated to: ${newVariable}`
    );
  }

  getState() {
    return { ...this };
  }
}
