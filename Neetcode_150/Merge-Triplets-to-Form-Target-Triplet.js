/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function (triplets, target) {
  // set stores the indices that we can find good values for
  const good = new Set();

  for (let t of triplets) {
    // skip triplets with values greater than target
    if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;

    // check if can reach target values with remaining triplets
    for (let i = 0; i < t.length; i++) {
      // if triplet value at index i === target at index i, add i to set
      if (t[i] === target[i]) {
        good.add(i);
      }
    }
  }
  // return true if have values for all three indices
  return good.size === 3;
};

// Time: O(n)
// Space: O(1)
