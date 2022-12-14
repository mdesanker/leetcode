/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let rob1 = 0,
    rob2 = 0;

  // [rob1, rob2, n, n + 1, ...]
  for (let num of nums) {
    let temp = Math.max(num + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
};

// Time: O(n)
// Space: O(1)
