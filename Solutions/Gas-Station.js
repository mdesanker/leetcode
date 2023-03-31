/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  // currTank finds starting index
  // totalTank finds whether sum(gas) >= sum(cost)
  let currTank = 0,
    totalTank = 0,
    pos = 0;
  // iterate through gas array
  for (let i = 0; i < gas.length; i++) {
    // add current diff to both curr and total tanks
    currTank += gas[i] - cost[i];
    totalTank += gas[i] - cost[i];

    // if currTank < 0, not suitable starting point
    if (currTank < 0) {
      // reset currTank
      currTank = 0;
      // move starting pointer
      pos = i + 1;
    }
  }
  // if totalTank < 0, not possible return -1 else return pos
  return totalTank < 0 ? -1 : pos;
};

// Time: O(n)
// Space: O(1)
