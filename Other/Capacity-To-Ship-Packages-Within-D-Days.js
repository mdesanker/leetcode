/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
// Binary Search Template
var shipWithinDays = function (weights, days) {
  function isValid(capacity) {
    let time = 1,
      currWeight = 0;
    for (let weight of weights) {
      currWeight += weight;
      if (currWeight > capacity) {
        currWeight = weight;
        time++;
      }
    }
    return time <= days;
  }

  let l = Math.max(...weights),
    r = weights.reduce((a, b) => a + b);

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

// Time: O(nlogn) every iteration of binary search, we traverse entire weights array to check if valid capacity
// Space: O(1)

var shipWithinDays = function (weights, days) {
  const totalLoad = weights.reduce((a, b) => a + b);
  const maxLoad = Math.max(...weights);

  // the ship must be able to carry at least the largest load in the weights array
  // largest capacity we need to consider is a ship that can move all weights in one pass
  let l = maxLoad,
    r = totalLoad;
  let res = r;

  // helper function calculates how long it will take to transport if ship has capacity and
  // returns whether this is feasible given the day constraint in the parameters of main function
  function isFeasible(capacity) {
    let daysNeeded = 1,
      currentLoad = 0;
    for (let weight of weights) {
      currentLoad += weight;
      if (currentLoad > capacity) {
        daysNeeded++;
        currentLoad = weight;
      }
    }
    return daysNeeded <= days;
  }

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    // if capacity mid is feasible, update res and check if a smaller capacity will work
    if (isFeasible(mid)) {
      res = Math.min(res, mid);
      r = mid - 1;
    } else {
      // if capacity mid is too small, then we need to consider a larger capacity
      l = mid + 1;
    }
  }
  return res;
};

/**
Time: O(nlogn) 
  O(n) to find total and max weights
  O(logn) for binary search. Binary search is O(logR) where R is the range of numbers.
      Problem constraints say maxLoad is 500, to totalLoad can be 500*n, so worst case scenario
      is O(log(500n - 500)) = O(logn)
  O(n) for isFeasible check because we iterate through weights array with each iteration of binary search

Space: O(1)
  Just a few pointers specified
*/
