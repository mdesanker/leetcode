/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var makeArrayIncreasing = function (arr1, arr2) {
  arr2.sort((a, b) => a - b);

  const memo = {};

  function bs(prev) {
    let l = 0,
      r = arr2.length;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      if (arr2[mid] > prev) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }

  const dfs = (i, prev) => {
    if (i >= arr1.length) return 0;

    // memoization
    let key = `${i},${prev}`;
    if (key in memo) return memo[key];

    // 2 options - swap or don't swap
    // swap only valid if an element exists in arr2 greater than prev
    let j = bs(prev);
    let swap = j < arr2.length ? 1 + dfs(i + 1, arr2[j]) : Infinity;
    // noSwap only valid if current value arr[i] is greater than prev
    let noSwap = arr1[i] > prev ? dfs(i + 1, arr1[i]) : Infinity;
    return (memo[key] = Math.min(swap, noSwap));
  };

  const changes = dfs(0, -Infinity);
  return changes === Infinity ? -1 : changes;
};
// TC: O(n * m * logn)
// SC: O(n * m)
