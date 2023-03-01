/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var findBestValue = function (arr, target) {
  function findSum(val) {
    let sum = 0;
    for (let num of arr) {
      sum += num > val ? val : num;
    }
    return sum;
  }

  // binary search to get sum as close to target as possible
  let l = 0,
    r = Math.max(...arr);
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    let currSum = findSum(mid);
    if (currSum > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  // l will either be equal to or 1 greater than the answer
  let first = findSum(l),
    second = findSum(l - 1);
  return Math.abs(first - target) < Math.abs(second - target) ? l : l - 1;
};

// Time: O(nlogk) where n is length of arr and k is range (max(arr))
// Space: O(1)
