import { Connection } from "../db/models/connection.js";

export default class DCAState {
  constructor() {
    this.symbol = "";
    this.initialPrice = 0;
    this.buyPrecentage = 0;
    this.percentToBuy = 0;
    this.minQtyFactor = 1;
    this.quantityToBuy = 0;
    this.totalQty = 0;
    this.scallingFactor = 1;
    this.currentNextBuyPrice = 0;
    this.avgPrice = 0;
    this.interval = 0;
    this.intervals = [];
    this.buyCount = 0;
    this.percentageThreshold = 0.3; // סף אחוזים להבדל
    this.lastOrderTime = 0;
    this.chosenCategory = "linear";
    this.percentageToAdd = 0;
    this.unrealisedPnl = 0;
    this.forceSave = false;
    this.isBusy = false;
    this.waitForSimulation = false;
    this.isWaitingForBounce = false;
    this.forcedInitialPrice = false;
    this.lowestPrice1 = null;
    this.lowestPrice = null;
    this.lowestPrice = null;
    this.isAllowedToBuy = false;
    this.forceResetBuyPercentage = false;
    this.connection = null;
  }

  setState(key, value, noLog = false) {
    if (!(key in this)) {
      console.error(`❌ ${this.symbol} -- [setState] Invalid key: ${key}`);
      return;
    }
    this[key] = value;
    if (!noLog) {
      console.log(
        `✅ ${this.symbol} -- [setState] ${key} updated to: ${value}`
      );
    }
  }

  setLastOrderTime(newOrderTime) {
    this.lastOrderTime = newOrderTime;
    console.log(
      `✅ ${this.symbol} -- [Order Time] updated to: ${newOrderTime}`
    );
  }

  setInitialPrice(newPrice) {
    this.initialPrice = newPrice;
    // console.log(`✅ ${this.symbol} -- [InitialPrice] updated to: ${newPrice}`);
  }

  turnIsBusy(value) {
    this.isBusy = value;
    console.log(`✅ ${this.symbol} -- [isBusy] updated to: ${this.isBusy}`);
  }

  setInterval(newInterval) {
    this.interval = newInterval;
    // console.log(`✅ ${this.symbol} -- [Interval] updated to: ${this.interval}`);
  }
  setIntervals(newIntervals) {
    this.intervals = newIntervals;
    console
      .log
      // `✅ ${this.symbol} -- [Interval] updated to: ${this.intervals}`
      ();
  }

  setPercentageToAdd(newPercentageToAdd, log) {
    this.percentageToAdd = newPercentageToAdd;
    if (log) {
      console
        .log
        // `✅ ${this.symbol} -- [PercentageToAdd] updated to: ${newPercentageToAdd}`
        ();
    }
  }

  async updateBuyPercent(newVariable) {
    this.buyPrecentage = newVariable;
    // console.log(
    //   `✅ ${this.symbol} -- [Buy Percentage] updated to: ${newVariable}`
    // );
  }

  getState() {
    return { ...this };
  }
}
