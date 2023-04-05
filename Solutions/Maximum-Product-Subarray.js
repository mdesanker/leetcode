/**
Solution: Dynamic Programming

Negative numbers and 0 can throw off your result.
Need to track currMax and currMin as we go along, because currMin can turn into currMin if we encounter another negative number

n = nums.length
TC: O(n)
SC: O(1)
 */
var maxProduct = function (nums) {
  let currMax = (currMin = res = nums[0]);

  for (let i = 1; i < nums.length; i++) {
    const curr = nums[i];

    let tempMax = Math.max(curr, curr * currMax, curr * currMin);
    currMin = Math.min(curr, curr * currMax, curr * currMin);
    currMax = tempMax;

    res = Math.max(currMax, res);
  }
  return res;
};

// Time: O(n)
// Space: O(1)
