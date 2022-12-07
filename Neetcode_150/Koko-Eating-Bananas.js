/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // worst possible answer is the largest pile in piles
  let left = 1,
    right = Math.max(...piles);

  // set res to upper limit
  let res = right;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let hours = 0;
    for (let p of piles) {
      hours += Math.ceil(p / mid);
    }

    if (hours <= h) {
      res = Math.min(res, mid);
      right = mid - 1; // try to find smaller answer
    } else {
      left = mid + 1; // try to find larger answer
    }
  }
  return res;
};

// Time: O(log(maxP)) where P is largest pile in piles
// Space: O(1)
