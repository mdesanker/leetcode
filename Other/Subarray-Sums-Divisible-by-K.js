// https://leetcode.com/problems/subarray-sums-divisible-by-k/solutions/413234/detailed-whiteboard-beats-100-do-you-really-want-to-understand-it/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function (nums, k) {
  // array stores the number of subarrays with sum of elements having remainder i when divided by k
  const freq = new Array(k).fill(0);
  freq[0] = 1;

  let prefixMod = 0,
    count = 0;

  for (let num of nums) {
    // calculate prefixMod for each num
    // add k and take % k again to handle negative values
    prefixMod = (prefixMod + (num % k) + k) % k;

    // add count of subarrays that have same remainder as current one
    count += freq[prefixMod];

    // include remainder of subarray for future matches
    freq[prefixMod]++;
  }
  return count;
};

// Time: O(n + k);
// Space: O(k)
