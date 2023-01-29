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
  // sort by position in descending order to start with car closest to end point
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

/** 
Will combine position and speed for each car into a single array.
Cars then need to be sorted by distance to target, because this will determine their order as they cannot overtake.
We will iterate through the cars from closest to target to fartheset, and push cars onto a stack based on how long 
it will take them to finish (distance remaining / speed)

Since car's cannot overtake, if a car behind would get to target at the same time or faster than the car in front, it will catch up to
the car in front and form a car fleet. In this case, the second car is popped from the stack and considered to be part of the previous car.
Will repeat this for all cars and then every unique car in stack will be a "fleet" of cars, so we can return the length of the stack.

Build pair array, combining position and speed for each car
Sort in decreasing order by position (higher position means closer to target)

Iterating through pair array, calculate time to target for each car and push onto stack.
If there are at least 2 cars in the stack to compare, check if time for last car in stack is less than or equal to second last car in stack.
Second last car in stack is in front of last car, so if last car can catch up to second last, then it will form a car fleet.
If last car catches up, pop it from the stack.

Return the length of the stack which will equal the number of car fleets

TC: O(nlogn) to sort the pair array
SC: O(n) worst case scenario every car gets to target a different time, so every car is it's own fleet and stack will hold every car
*/
