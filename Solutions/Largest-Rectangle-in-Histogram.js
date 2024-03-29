/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  // this will force all rectangles to end so we don't need a while loop at the end
  heights.push(0);
  let res = 0;
  const stack = []; // [index, height]

  for (let i = 0; i < heights.length; i++) {
    let startIndex = i;
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      let [pos, height] = stack.pop();
      res = Math.max(res, height * (i - pos));
      startIndex = pos;
    }
    stack.push([startIndex, heights[i]]);
  }

  return res;
};

// Time: O(n)
// Space: O(n)

/**
https://leetcode.com/problems/largest-rectangle-in-histogram/solutions/1430546/monotonique-stack-solution-intuition-javascript/

Increasing heights:
When heights are increasing, we can build a rectangle from the index where a previous height started to the current index

e.g. heights = [1, 2, 5];
Rectangle of height 1 extends from index 0 to index 2
Rectangle of height 2 extends from index 1 to index 2
Rectangle of height 5 extends from index 2 to index 2

Decreasing heights:
When heights are decreasing, we cannot extend previous rectangles, so we must evaluate them for maxArea and remove from consideration (pop from stack)

e.g. heights = [1, 3, 5, 2];

Rectangle of height 1 extends from 0 to 3
Rectangle of height 3 extends from 1 to 3
Rectangle of height 5 extends from 2 to 3
Rectangle of height 1 extends from 1 to 3

while (stack.length && stack[stack.length - 1][1] > heights[i]) {
  let [pos, height] = stack.pop();
  maxArea = Math.max(maxArea, height * (i - pos))
}

When we are setting starting point for the current height, we want to extend it through all the previous heights that were greater than it, 
because it can be extended backwards. Initialize the starting index for the current index before entering the while loop above,
then update the starting index with the pos of every height that is popped off the stack. 
Every time a larger height is popped off, the starting index will be pushed back, until you reach the point that the current height would start

let startIndex = 1;
while (stack.length && stack[stack.length - 1][1] > heights[i]) {
  let [pos, height] = stack.pop();
  maxArea = Math.max(maxArea, height * (i - pos))
  startIndex = pos;
}
stack.push([startIndex, heights[i]]);

Push 0 onto heights:
There are some heights that will continue to the end of the heights array. With the above logic, areas are not processed until we encounter a height
that is lower than the previous height, forcing the previous value to be popped off the stack and compared against maxArea. 
Pushing 0 onto end of heights array would force all heights to be popped off stack at end of the array and processed.

TC: O(n) we iterate through heights array once
SC: O(n) if all values in heights array are increasing, we will have to store every height in the stack
 */

// Brute force solution
var largestRectangleArea = function (heights) {
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    // need to track the minimum height for every range of lengths
    let minHeight = Infinity;
    // start window from i
    for (let j = i; j < heights.length; j++) {
      // update minHeight with every step
      minHeight = Math.min(minHeight, heights[j]);
      // current area is minHeight * length
      // j - i + 1 because we treat each index as having a width of 1
      res = Math.max(res, minHeight * (j - i + 1));
    }
  }
  return res;
};

// Time: O(n^2) for nested for loops
// Space: O(1) constant space for res variable

/**
Brute force check every possible rectangle width and height
i variable tracks left edge, j tracks right edge of rectangle
We need to track the minHeight for every window as this will be the height of said rectangle
We consider each index as having a length of 1, so length will be (j - i + 1)

TC: O(n^2) for nested for loops
SC: O(1) no extra space needed
 */
