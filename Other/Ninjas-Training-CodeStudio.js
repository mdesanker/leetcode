/**
Problem on CodingStudio:
https://www.codingninjas.com/codestudio/problems/ninja-s-training_3621003
 */
const tasks = [
  [1, 2, 5],
  [3, 1, 1],
  [3, 3, 3],
];

// Recursion
var training = (tasks) => {
  const n = tasks.length,
    m = tasks[0].length;

  // params for dp function are the index/day that we are current on, and the activity that was performed on the previous day
  function dp(day, last) {
    // base case
    // if day === 0, then we want to return the max of the acitivities that we are allowed to perform today
    if (day === 0) {
      let max = 0;
      for (let task = 0; task < m; task++) {
        if (task !== last) {
          max = Math.max(max, tasks[0][task]);
        }
      }
      return max;
    }

    // recurrence relation
    // return the max of the activities that can be performed for the given day
    let max = 0;
    for (let task = 0; task < m; task++) {
      if (task !== last) {
        let points = tasks[day][task] + dp(day - 1, task);
        max = Math.max(max, points);
      }
    }
    return max;
  }
  // call recursive function on last day, with prev set to -1 so that all activities are possible on the "first" day we process
  return dp(n - 1, -1);
};

// Recursion + memoization
var training = (tasks) => {
  const n = tasks.length,
    m = tasks[0].length;

  const memo = {};

  // params for dp function are the index/day that we are current on, and the activity that was performed on the previous day
  function dp(day, last) {
    // check cache
    const key = `${day}#${last}`;
    if (key in memo) return memo[key];

    // base case
    // if day === 0, then we want to return the max of the acitivities that we are allowed to perform today
    if (day === 0) {
      let max = 0;
      for (let task = 0; task < m; task++) {
        if (task !== last) {
          max = Math.max(max, tasks[0][task]);
        }
      }
      return max;
    }

    // recurrence relation
    // return the max of the activities that can be performed for the given day
    let max = 0;
    for (let task = 0; task < m; task++) {
      if (task !== last) {
        let points = tasks[day][task] + dp(day - 1, task);
        max = Math.max(max, points);
      }
    }
    return (memo[key] = max);
  }
  // call recursive function on last day, with prev set to -1 so that all activities are possible on the "first" day we process
  return dp(n - 1, -1);
};

// Time: O(n * m * m)
// Space: O(n * m) - O(n) for recursion stack, O(n * m) for the cache

// Tabulation
var training = (tasks) => {
  const n = tasks.length,
    m = tasks[0].length;

  // create a 2D array with same dimensions as task array
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp.push(new Array(m).fill(0));
  }
  dp[0] = tasks[0];

  for (let day = 1; day < n; day++) {
    for (let last = 0; last < m; last++) {
      // for every task on current day, add non-equal tasks from previous day until find max
      let max = 0;
      for (let task = 0; task < m; task++) {
        if (task !== last) {
          let points = tasks[day][last] + dp[day - 1][task];
          max = Math.max(max, points);
        }
      }
      dp[day][last] = max;
    }
  }
  return Math.max(...dp[n - 1]);
};

// Time: O(n * m * m)
// Space: O(n * m)

// Tabulation - Optimization 1
// Only save previous row
var training = (tasks) => {
  const n = tasks.length,
    m = tasks[0].length;

  // optimize space by only tracking previous row
  let dp = tasks[0];

  for (let day = 1; day < n; day++) {
    // create temporary array for current row
    let temp = new Array(m).fill(0);
    for (let last = 0; last < m; last++) {
      let max = 0;
      for (let task = 0; task < m; task++) {
        if (task !== last) {
          let points = tasks[day][last] + dp[task];
          max = Math.max(max, points);
        }
      }
      temp[last] = max;
    }
    // overwrite dp array with temp array as we move onto next row
    dp = temp;
  }
  return Math.max(...dp);
};

// Time: O(n * m * m)
// Space: O(m) for the dp array

// Tabulation - Optimization 2
// Update values in tasks array so no additional memory required
var training = (tasks) => {
  const n = tasks.length,
    m = tasks[0].length;

  for (let day = 1; day < n; day++) {
    for (let last = 0; last < m; last++) {
      let max = 0;
      for (let task = 0; task < m; task++) {
        if (task !== last) {
          let points = tasks[day][last] + tasks[day - 1][task];
          max = Math.max(max, points);
        }
      }
      // update max values in the task array, so no additional memory is required
      tasks[day][last] = max;
    }
  }
  return Math.max(...tasks[n - 1]);
};

// Time: O(n * m * m)
// Space: O(1)

console.log(training(tasks));
