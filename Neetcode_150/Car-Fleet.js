/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
  // create pair array
  const pair = [];
  position.forEach((pos, i) => pair.push([position[i], speed[i]]));
  // sort by position
  pair.sort((a, b) => b[0] - a[0]);

  const stack = [];
  for (let i = 0; i < pair.length; i++) {
    // push time to end
    stack.push((target - pair[i][0]) / pair[i][1]);
    // if further car (higher index in stack) is faster, it will be slowed to the speed of the car before it --> joins car fleet
    if (
      stack.length >= 2 &&
      stack[stack.length - 1] <= stack[stack.length - 2]
    ) {
      stack.pop();
    }
  }
  // return number of fleets in stack
  return stack.length;
};

// Time: O(NlogN) due to sorting cars
// Space: O(N)
