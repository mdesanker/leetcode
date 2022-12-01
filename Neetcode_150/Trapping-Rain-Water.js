/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  if (!height) return 0;

  let left = 0,
    right = height.length - 1;
  let leftMax = height[left],
    rightMax = height[right];
  let res = 0;

  while (left < right) {
    // volume of water is going to be equal to height of lowest barrir on either side - the height at given index
    if (leftMax < rightMax) {
      left++;
      // increase max trackers as greater heights encountered
      leftMax = Math.max(leftMax, height[left]);
      res += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      res += rightMax - height[right];
    }
  }

  return res;
};

// Time: O(N)
// Space: O(1)
