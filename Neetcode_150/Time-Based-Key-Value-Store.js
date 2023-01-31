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

// Time: O(logn)
// Space: O(1)

/**
Initialize:
Initialize the store as a map.
The map will store key value pairs where the value is an array of pairs of values and their corresponding timestamps
key: [[value1, timestamp1], [value2, timestamp2]]
Timestamps are strictly increasing so the value arrays will be automatically sorted, allowing binary search to find correct value
Using a map gives O(1) lookup and set operations for keys

Set:
If this key does not exist in the store yet, we will need to set it to an empty array, so that we can use one function to push values
Every value is set with a timestamp, so use a two element array to pair the values

Get:
Edge case - the key does not exist in the store, return empty string

The key does exist in the store, store array of values in variable
Initialize result variable to empty string

The entries in value array are sorted in order of increasing timestamp, so can use binary search to find value 
with exact timestamp or with the largest previous timestamp

Initialize l and r pointer to beginning and end of values array for desired key
Calculate mid point
If the timestamp of the mid point value is <= timestamp, then this is a potential result, but we want to see if there is a valid answer with
larger timestamp or timestamp that is exactly equal to target timestamp
Therefore move l pointer to mid + 1
If timestamp of the mid pointer is greater than the target timestamp, we do not have a valid result
Move r pointer to mid - 1, to see if we can find a value with a lower timestamp

TC: O(logn) initialization and set functions are O(1), get function is O(logn) because of binary search to find right value
SC: O(1)
 */
