/**
 * @param {number[]} obstacles
 * @return {number[]}
 */
var longestObstacleCourseAtEachPosition = function (obstacles) {
  const n = obstacles.length;
  let lisLength = 0;

  function bs(A, target, r) {
    if (r === 0) return 0;
    let l = 0;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      if (A[mid] <= target) {
        l = mid + 1;
      } else {
        r = mid;
      }
    }
    return l;
  }

  const res = new Array(n);
  const lis = new Array(n);

  for (let i = 0; i < n; i++) {
    let height = obstacles[i];

    const index = bs(lis, height, lisLength);
    if (index === lisLength) {
      lisLength++;
    }
    lis[index] = height;
    res[i] = index + 1;
  }
  return res;
};
// TC: O(nlogn)
// SC: O(n)
