/**
 * @param {number[]} citations
 * @return {number}
 */
// Sorting
var hIndex = function (citations) {
  citations.sort((a, b) => b - a);
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] < i + 1) return i;
  }
  return citations.length;
};
// TC: O(nlogn) - built in sort
// SC: O(logn) - built in sort

// Binary Search
var hIndex = function (citations) {
  let l = 0,
    r = citations.length;
  citations.sort((a, b) => b - a);
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (citations[mid] > mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return r;
};
// TC: O(nlogn) - built in sort
// SC: O(logn) - built in sort
