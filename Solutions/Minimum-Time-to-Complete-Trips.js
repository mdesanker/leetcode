/**
 * @param {number[]} time
 * @param {number} totalTrips
 * @return {number}
 */
var minimumTime = function (time, totalTrips) {
  function isValid(val) {
    let count = 0;
    for (let t of time) {
      count += Math.floor(val / t);
    }
    return count >= totalTrips;
  }

  let l = 1,
    r = Math.max(...time) * totalTrips;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (isValid(mid)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

// Time: O(nlogn)
// Space: O(1)
