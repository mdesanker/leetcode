var TimeMap = function () {
  this.store = {}; // key = string, value = [list of [value, timestamp]]
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  if (!(key in this.store)) this.store[key] = [];
  this.store[key].push([value, timestamp]);
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  let res = "";
  const values = this.store[key] || [];

  let left = 0,
    right = values.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // if value has a lower timestamp, then try to find value with higher but exact time stamp by moving left pointer
    if (values[mid][1] <= timestamp) {
      res = values[mid][0];
      left = mid + 1;
      // not valid value, time too large so don't update result
    } else {
      right = mid - 1;
    }
  }

  return res;
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
