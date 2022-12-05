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

// Time: O(N)
// Space: O(N)
