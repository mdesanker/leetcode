/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const res = [];

  const preMap = {};
  for (let i = 0; i < numCourses; i++) {
    preMap[i] = [];
  }

  for (const [crs, pre] of prerequisites) {
    preMap[crs].push(pre);
  }

  const visit = new Set(), // crs and prereqs have been visited and has been added to res
    cycle = new Set(); // track courses visited in current path to check for loops

  function dfs(crs) {
    // base cases
    // if in cycle, visiting second time
    if (cycle.has(crs)) return false;
    // if already visited, don't need to visit again
    if (visit.has(crs)) return true;

    // add to cycle so can detect cycle
    cycle.add(crs);

    for (const pre of preMap[crs]) {
      // if detect cycle
      if (!dfs(pre)) return false;
    }

    // remove from cycle because might not be on next path
    cycle.delete(crs);
    // crs and all prereqs have been visited
    visit.add(crs);
    // preMap[crs] = [];
    res.push(crs);
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return [];
  }
  return res;
};

// Time: O(v + e) for adjacency list
// Space: O(v + e)
