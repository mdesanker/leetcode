/**
 * @param {number[]} height
 * @return {number}
 */

const maxArea = function (height) {
  let max = 0,
    start = 0,
    end = height.length - 1;

  while (start < end) {
    // area = min height of start or end index * distance between start and end
    max = Math.max(max, Math.min(height[start], height[end]) * (end - start));

    // increment the smaller height inward
    height[start] <= height[end] ? start++ : end--;
  }

  return max;
};

/*
Time: O(N)
Space: O(1)
*/
