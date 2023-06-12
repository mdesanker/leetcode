/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const ranges = [];
  let i = 0;

  while (i < nums.length) {
    start = nums[i];
    while (i + 1 < nums.length && nums[i] + 1 === nums[i + 1]) {
      i++;
    }

    if (start !== nums[i]) {
      ranges.push(`${start}->${nums[i]}`);
    } else {
      ranges.push(nums[i].toString());
    }
    i++;
  }
  return ranges;
};
// TC: O(n)
// SC: O(1)
