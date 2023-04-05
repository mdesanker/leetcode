/**
Solution: Prefix Sum + Greedy

We traverse the array forwards building the prefix sum. The minimum maximum we can create is Math.ceil(prefixSum / (i + 1))

nums = [3, 7, 1, 3]

[3, 7] -> [5, 5]
Math.ceil(prefixSum / (i + 1)) = Math.ceil(10 / 2) = 5

[3, 7, 1] -> [5, 5, 1]
Math.ceil(prefixSum / (i + 1)) = Math.ceil(11 / 3) = 4 (Maxed against previous value, 5)

[3, 7, 1, 3] -> [5, 5, 2, 2]
Math.ceil(prefixSum / (i + 1)) = Math.ceil(14 / 4) = 4 (Maxed against previous value, 5)

n = nums.length
TC: O(n)
SC: O(1)
 */
var minimizeArrayValue = function (nums) {
  let res = 0,
    prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    res = Math.max(res, Math.ceil(prefixSum / (i + 1)));
  }
  return res;
};
// TC: O(n)
// SC: O(1)

console.log(minimizeArrayValue([3, 7, 1, 3]));
