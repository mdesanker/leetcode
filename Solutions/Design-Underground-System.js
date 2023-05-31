var UndergroundSystem = function () {
  this.check = {};
  this.time = {};
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.check[id] = [stationName, t];
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  const [src, start] = this.check[id];
  delete this.check[id];
  const key = `${src}#${stationName}`;
  if (!this.time[key]) this.time[key] = [];
  this.time[key].push(t - start);
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (
  startStation,
  endStation
) {
  const key = `${startStation}#${endStation}`;
  const times = this.time[key];
  const len = times.length;
  return times.reduce((a, b) => a + b) / len;
};
// TC: O(n)
// SC: O(n)

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */
