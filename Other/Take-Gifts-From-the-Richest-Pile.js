/**
 * @param {number[]} gifts
 * @param {number} k
 * @return {number}
 */
var pickGifts = function (gifts, k) {
  for (let i = 0; i < k; i++) {
    const maxIndex = gifts.indexOf(Math.max(...gifts));
    const remaining = Math.floor(Math.sqrt(gifts[maxIndex]));
    gifts[maxIndex] = remaining;
  }
  return gifts.reduce((a, b) => a + b);
};

// Time: O(nk) finding the index of the maximum gift is a linear time operation and this is done k times,
//  and calculating the sum of the array is a linear time operation
// Space: O(1) no additional space is needed
