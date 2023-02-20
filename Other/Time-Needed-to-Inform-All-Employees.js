/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
// DFS
var numOfMinutes = function (n, headID, manager, informTime) {
  // build adjacency list
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < manager.length; i++) {
    if (manager[i] === -1) continue;
    adj[manager[i]].push(i);
  }

  let res = 0;

  function dfs(id, currTime) {
    // time taken is the same for all employees of the same level
    res = Math.max(res, currTime);

    for (let nei of adj[id]) {
      // accumulate time to notify by adding time for employee to time for manager
      dfs(nei, currTime + informTime[nei]);
    }
  }

  // start from the head of the company
  dfs(headID, informTime[headID]);
  return res;
};

// Time: O(v + e)
// Space: O(v + e)

// BFS
var numOfMinutes = function (n, headID, manager, informTime) {
  // build adjacency list
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < manager.length; i++) {
    if (manager[i] === -1) continue;
    adj[manager[i]].push(i);
  }

  let res = 0;
  const q = [[headID, 0]];

  while (q.length) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const [id, time] = q.shift();

      res = Math.max(res, time);

      for (let nei of adj[id]) {
        q.push([nei, time + informTime[id]]);
      }
    }
  }
  return res;
};

// Time: O(v + e)
// Space: O(v + e)
