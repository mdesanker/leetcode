/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // map each course to empty array
  const preMap = {}; // {crs: [pre]}
  for (let i = 0; i < numCourses; i++) {
    preMap[i] = [];
  }

  // push prereqs into each course array
  for (const [crs, pre] of prerequisites) {
    preMap[crs].push(pre);
  }

  // track which courses have been visited
  const visited = new Set();

  function dfs(crs) {
    // base cases
    // course already visited
    if (visited.has(crs)) return false;
    // course has no prereqs
    if (preMap[crs].length === 0) return true;

    // add new crs to visited
    visited.add(crs);

    // check each prereq of crs
    for (const pre of preMap[crs]) {
      if (!dfs(pre)) return false;
    }

    // remove crs from visited
    visited.delete(crs);
    // if made it this for, then all prereqs are satisfied - remove prereqs to expedite future searches
    preMap[crs] = [];
    return true;
  }
  // check each course is completable
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
};

// Time: O(v + e) where v is number of courses and e is number of prereqs
// Space: O(v + e) for the graph adjacency list
