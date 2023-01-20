/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function (nums, k) {
  let N = nums.length,
    left = 0,
    right = 0,
    pairs = 0,
    res = 0;
  const freqMap = {};

  while (right < N) {
    const rightNum = nums[right];

    if (freqMap.hasOwnProperty(rightNum)) {
      pairs += freqMap[rightNum];
      freqMap[rightNum]++;
    } else {
      freqMap[rightNum] = 1;
    }

    while (pairs >= k) {
      const leftChar = nums[left];
      if (freqMap[leftChar] > 0) {
        pairs -= freqMap[leftChar] - 1;
      }
      freqMap[leftChar]--;
      left++;

      res += N - right;
    }
    right++;
  }
  return res;
};

// Time: O(n)
// Space: O(n)
