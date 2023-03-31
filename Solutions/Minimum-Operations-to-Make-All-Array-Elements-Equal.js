/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */

/**
Key insight
Prefix sum, binary search
1. Sort nums in ascending order
2. Build prefix sum arrays in forward and reverse direction
3. For each query, binary search to find split point, first element where nums[i] >= query
4. Calculate absolute difference of the two segments of nums
    Segment one: query * i - leftSum[i - 1]
    Segment two: rightSum[i] - query * (n - i)
 */

var minOperations = function (nums, queries) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const left = [...nums];
  const right = [...nums];
  for (let i = 1; i < n; i++) left[i] += left[i - 1];
  for (let i = n - 2; i >= 0; i--) right[i] += right[i + 1];

  const res = [];

  for (const val of queries) {
    const ind = bs(val);
    let leftVal = ind > 0 ? val * ind - left[ind - 1] : 0;
    let rightVal = ind < n ? right[ind] - val * (n - ind) : 0;
    res.push(leftVal + rightVal);
  }
  return res;

  function bs(val) {
    let l = 0;
    r = n - 1;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      if (val <= nums[mid]) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return nums[l] >= val ? l : n;
  }
};

// n = nums.length, m = queries.length
// Time: O(nlogn + mlogn)
// Space: O(n + m)
