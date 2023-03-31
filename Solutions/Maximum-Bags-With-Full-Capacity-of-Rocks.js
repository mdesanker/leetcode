/**
 * @param {number[]} capacity
 * @param {number[]} rocks
 * @param {number} additionalRocks
 * @return {number}
 */
var maximumBags = function (capacity, rocks, additionalRocks) {
  let n = capacity.length;

  // substract rocks to find number need to fill each bag in capacity array
  for (let i = 0; i < n; i++) {
    capacity[i] -= rocks[i];
  }

  // sort in increasing order
  capacity.sort((a, b) => a - b);

  let res = 0;
  // fill smallest bags first to maximize res
  for (let i = 0; i < n; i++) {
    // if no more or not enough additional rocks to fill next bag, break
    if (additionalRocks === 0 || capacity[i] > additionalRocks) break;
    // subtract number of rocks needed to fill bag from additional rocks
    additionalRocks -= capacity[i];
    // increment counter
    res++;
  }
  return res;
};

// Time: O(nlogn) for sort function
// Space: O(1) no additional space needed
