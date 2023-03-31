/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var minDays = function (bloomDay, m, k) {
  function isValid(days) {
    let bouquets = 0,
      flowers = 0;
    for (let bloom of bloomDay) {
      if (bloom > days) {
        flowers = 0;
      } else {
        flowers++;
        if (flowers === k) {
          bouquets++;
          flowers = 0;
        }
      }
    }
    // if bouquets < m, then not enough days have passed to produce flowers
    // if bouquets >= m, then days is big enough to produce enough flowers
    return bouquets >= m;
  }

  if (m * k > bloomDay.length) return -1;

  let l = Math.min(...bloomDay),
    r = Math.max(...bloomDay);
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
