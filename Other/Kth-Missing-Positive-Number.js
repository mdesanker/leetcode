/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
// Set implementation
var findKthPositive = function (arr, k) {
  const set = new Set(arr);
  let res = 0;
  for (let i = 0; i < k; i++) {
    res++;
    while (set.has(res)) {
      res++;
    }
  }
  return res;
};

// Time: O(n)
// Space: O(n)
