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

/**
Two pointers so initialize pointer at beginning (l) and end (r).
While left pointer < right pointer.

Current volume is height * length
Height is going to be the mnimum of the heights of the l and r pointer, because water will
overflow beyond that.
Length is the distance between the l and r pointers.
Compare the current volume to the max volume.

Move the pointer with the lower height in the hopes of finding a height and is closer
or greater than the height of the other pointer

TC: O(n) traverse height array once
SC: O(1) constant memory needed to store the values of the two pointers
 */
