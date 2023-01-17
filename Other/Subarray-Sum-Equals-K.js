/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0,
    currSum = 0;
  const map = new Map(); // key: sum, val: number of occurrences
  // one way to sum to 0 at beginning
  map.set(0, 1);

  for (let num of nums) {
    // add num to currSum
    currSum += num;

    // if currSum - k exists in map, have found valid subarray
    if (map.has(currSum - k)) count += map.get(currSum - k);

    // add currSum to map
    map.set(currSum, map.get(currSum) + 1 || 1);
  }
  return count;
};

// Time: O(n)
// Space: O(n)
