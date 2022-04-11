/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const charMap = {};

  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (charMap.hasOwnProperty(diff)) {
      return [i, charMap[diff]];
    } else {
      charMap[nums[i]] = i;
    }
  }
  return [-1, -1];
};
