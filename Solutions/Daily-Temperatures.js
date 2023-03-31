/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = []; // pair [temp, index];

  for (let i = 0; i < temperatures.length; i++) {
    // if new temp is larger than last temp on stack, pop and push the difference in indices to results
    while (stack.length && temperatures[i] > stack[stack.length - 1][0]) {
      const [stackT, stackInd] = stack.pop();
      res[stackInd] = i - stackInd;
    }

    // push new temp and index onto stack
    stack.push([temperatures[i], i]);
  }
  return res;
};

// Time: O(n)
// Space: O(n)

/** 
Use an array of length temperatures filled with 0 for results, because 0 will be the default for days that aren't followed by a higher temperature
A stack will hold all of the visited days that are waiting for a higher temp and their index.

Iterate through temperatures array
If there is at least one value in the stack and the current temperature is greater than it, pop it from the stack and use it's index to set
the value for that temp to the index of the current temp minus the index of itself (from the stack).

Once all lower temps have been popped and processed from stack, push the current temp and index pair to the stack so we can try to find the next
temperature higher than it

TC: O(n) iterate through temperatures array once
SC: O(n) if temperatures are sorted in descending order, then we will never find a warmer temperature for any day, so the stack will contain every temp
*/
