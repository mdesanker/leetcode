/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverageDifference = function (nums) {
  const avgDiff = [];
  let leftSum = 0;
  let rightSum = nums.reduce((a, b) => a + b, 0);

  // iterate through nums, adding nums[i] to left and removing from right
  for (let i = 0; i < nums.length; i++) {
    leftSum += nums[i];
    rightSum -= nums[i];

    // calculate averages for each side
    const leftSide = Math.floor(leftSum / (i + 1));
    const rightSide = Math.floor(rightSum / (nums.length - (i + 1)));

    // push avg diff to array
    avgDiff.push(
      Math.abs((leftSide ? leftSide : 0) - (rightSide ? rightSide : 0))
    );
  }

  // return the index of the minimum average difference
  return avgDiff.indexOf(Math.min(...avgDiff));
};

// Time: O(N)
// Space: O(N)
