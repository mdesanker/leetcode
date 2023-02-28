/**
 * @param {number} n
 * @param {number[][]} relations
 * @return {number}
 */

/**
Key Insight:
Leaf nodes have no prereqs, so can all be taken at the same time
Use a queue to take all leaf courses at the same time
Use a step counter and increment for each batch of no-prereq courses
As we take courses, reduce indegrees for dependent courses
Use a visited counter to check for cycles, because if there is a cycle, then no valid answer
 */

var minimumSemesters = function (n, relations) {
  const indegrees = new Array(n + 1).fill(0);

  const adj = {};
  for (let i = 1; i < n + 1; i++) adj[i] = [];
  for (let [crs, pre] of relations) {
    adj[pre].push(crs);
    indegrees[crs]++;
  }

  const q = [];
  for (let i = 1; i < n + 1; i++) {
    if (indegrees[i] === 0) {
      q.push(i);
    }
  }

  let steps = 0;
  let visited = 0;

  while (q.length) {
    let len = q.length;
    steps++;

    while (len > 0) {
      const node = q.shift();
      len--;
      visited++;

      for (let nei of adj[node]) {
        indegrees[nei]--;
        if (indegrees[nei] === 0) {
          q.push(nei);
        }
      }
    }
  }
  return visited === n ? steps : -1;
};

/**
Time: O(v + e)
    O(v + e) to build graph (O(v) initializing vertices, then O(e) addind edges)
    O(v + e) building indegrees
    O(v + e) traversing every node and every edge
Space: O(v + e)
    O(v + e) for adj list
    O(v) for indegrees
    O(v) for queue
 */
