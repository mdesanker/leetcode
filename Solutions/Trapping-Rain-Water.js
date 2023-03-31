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

/**
Two pointer so initialize l to 0 and r to end of height array. 
Will also need to track the highest l and r heights so far,
so initialize lMax to height[l] and rMax to height[r]. This will determine how much water can 
be stored in internal spaces.

While l < r, it makes sense to increment the pointer on the side with the lower max height.
So if lMax < rMax, we will increment the l pointer to start, because the edge 
indices cannot hold water. 
Check if there is a new lMax height.
The volume of water we can add to the result counter will be equal to the current height at
the l pointer subtracted from the max height on the left side (lMax).

if lMax > rMax, then we repeat the same for the right side, except the r pointer is decremented

TC: O(n) height array is traversed once
SC: O(1) constant memory needed to store l, r, lMax, and rMax
 */
