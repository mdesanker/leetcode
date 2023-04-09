/**
Solution: Stack

Row of asteroids is stable if no further collusions will occur
Adding a new asteroid to the right, some more collisions may happen before it becomes stable again
All collisions must occur right to left
Makes ideal application for a stack

n = asteroids.length
TC: O(n)
SC: O(n)
 */
var asteroidCollision = function (asteroids) {
  const n = asteroids.length;
  const stack = [];

  for (let i = 0; i < n; i++) {
    if (asteroids[i] > 0) stack.push(asteroids[i]);
    else {
      // larger negative asteroids pop from top of stack
      while (
        stack.length !== 0 &&
        stack[stack.length - 1] > 0 &&
        stack[stack.length - 1] < -asteroids[i]
      ) {
        stack.pop();
      }
      // if asteroid is equal to negative of top of stack, both are destroyed (top removed from stack)
      if (stack.length !== 0 && stack[stack.length - 1] === -asteroids[i]) {
        stack.pop();
        // if asteroid is negative and smaller, then it is destroyed (not added to stack)
      } else if (
        stack.length !== 0 &&
        stack[stack.length - 1] > -asteroids[i]
      ) {
        continue;
        // if asteroid moving in same direction, add to stack
      } else {
        stack.push(asteroids[i]);
      }
    }
  }
  return stack;
};
// TC: O(n)
// SC: O(n)
