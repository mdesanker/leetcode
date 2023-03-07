/**
Problem on CodingStudio:
https://www.codingninjas.com/codestudio/problems/ninja-s-training_3621003
 */

// Recursion
var training = (task) => {
  const ROWS = task.length,
    COLS = task[0].length;

  // params for dp function are the index/day that we are current on, and the activity that was performed on the previous day
  function dp(day, prev) {
    // base case
    // if day === 0, then we want to return the max of the acitivities that we are allowed to perform today
    if (day === 0) {
      let max = 0;
      for (let j = 0; j < COLS; j++) {
        if (j !== prev) {
          max = Math.max(max, task[0][j]);
        }
      }
      return max;
    }

    // recurrence relation
    // return the max of the activities that can be performed for the given day
    let max = 0;
    for (let i = 0; i < COLS; i++) {
      if (i !== prev) {
        let points = task[day][i] + dp(day - 1, i);
        max = Math.max(max, points);
      }
    }
    return max;
  }
  // call recursive function on last day, with prev set to -1 so that all activities are possible on the "first" day we process
  return dp(ROWS - 1, -1);
};

// Recursion + memoization
var training = (task) => {
  const ROWS = task.length,
    COLS = task[0].length;

  // using a map
  const memo = new Map();

  // params for dp function are the index/day that we are current on, and the activity that was performed on the previous day
  function dp(day, prev) {
    // checck cache
    // key needs to include day and prev activity
    const key = `${day}#${prev}`;
    if (memo.has(key)) return memo.get(key);

    // base case
    // if day === 0, then we want to return the max of the acitivities that we are allowed to perform today
    if (day === 0) {
      let max = 0;
      for (let j = 0; j < COLS; j++) {
        if (j !== prev) {
          max = Math.max(max, task[0][j]);
        }
      }
      return max;
    }

    // recurrence relation
    // return the max of the activities that can be performed for the given day
    let max = 0;
    for (let i = 0; i < COLS; i++) {
      if (i !== prev) {
        let points = task[day][i] + dp(day - 1, i);
        max = Math.max(max, points);
      }
    }

    memo.set(key, max);

    return memo.get(key);
  }
  // call recursive function on last day, with prev set to -1 so that all activities are possible on the "first" day we process
  return dp(ROWS - 1, -1);
};

// Time: O(r * c * c)
// Space: O(r * c) - O(r) for recursion stack, O(r * c) for the cache

// Tabulation
var training = (task) => {
  const ROWS = task.length,
    COLS = task[0].length;

  // we will use the task array (constant space)
  // starting from second row, we will set each index to the max of the previous rows allowed tasks
  for (let day = 1; day < task.length; day++) {
    for (let c = 0; c < COLS; c++) {
      // calculate max from the previous day omitting the current task
      let max = 0;
      for (let i = 0; i < COLS; i++) {
        if (i !== c) {
          let points = task[day - 1][i];
          max = Math.max(max, points);
        }
      }
      task[day][c] += max;
    }
  }
  // return the max of the first row to get the max points
  return Math.max(...task[ROWS - 1]);
};

// Time: O(r * c * c)
// Space: O(1) - because we use the task array

// Above solution is already space optimized because we use the task array

// const tasks = [
//   [2, 1, 3],
//   [3, 4, 6],
//   [10, 1, 6],
//   [8, 3, 7],
// ];

// Result = 25

const tasks = [
  [1, 2, 5],
  [3, 1, 1],
  [3, 3, 3],
];

// Result = 11

console.log(training(tasks));
