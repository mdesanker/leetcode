/**
Solution: Hash map
 */
var majorityElement = function (nums) {
  const map = {};
  let max = 0,
    maxEl = nums[0];
  for (let num of nums) {
    let count = map[num] + 1 || 1;
    if (count > max) {
      max = count;
      maxEl = num;
    }
    map[num] = count;
  }
  return maxEl;
};
// TC: O(n)
// SC: O(n)
