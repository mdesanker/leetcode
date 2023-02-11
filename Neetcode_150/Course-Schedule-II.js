/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  // build adjacency list to relate crs and prereqs
  const adj = {};
  for (let i = 0; i < numCourses; i++) adj[i] = [];
  for (const [crs, pre] of prerequisites) adj[crs].push(pre);

  // res array will hold the topological sort of the courses
  const res = [];
  // visit will track the nodes that have been visited overall and have been shown not to have cycles
  const visit = new Set();
  // cycle will track the nodes that have been visited in the current path
  // this will allow us to detect cycles
  const cycle = new Set();

  function dfs(crs) {
    // base cases
    // if in cycle, we are visiting this node for the second time
    if (cycle.has(crs)) return false;
    // if already visited, don't need to visit again
    if (visit.has(crs)) return true;

    // add to cycle so it is included in the current path
    cycle.add(crs);

    // check all neighbor nodes for cycles
    for (const pre of adj[crs]) {
      // if detect cycle
      if (!dfs(pre)) return false;
    }

    // backtrack, remove from cycle because might not be on next path
    cycle.delete(crs);
    // this node does not have cycles in its path, so add to visited so we do not have to recheck its neighbors
    visit.add(crs);
    // preMap[crs] = [];
    // push the current crs onto the res array, now that we have traversed all of its prereqs
    res.push(crs);
    return true;
  }

  // call dfs on every node to check for cycles and build top sort
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return [];
  }
  return res;
};

// Time: O(v + e) we traverse every node and its neighbors (edges)
// Space: O(v + e) for adjacency list

/**
Very similar to "Course Schedule", except we will actually build the top sort and return it
If there is a cycle, return empty array because a valid top sort cannot be created in a cyclic graph

First build the adjacency list
In a hash map, create a key for every node (crs) mapping it to an empty array of neighbors (prereqs)
Iterating through list of edges (prereqs), push prereqs on to corresponding nodes (crs)

Initialize a res array
Initialize two sets
1. visited will track the nodes that have been "verified" as not having cycles
2. path will track the nodes in the current path. If we encounter a node that is already in the path, we have a cycle

We will iterate through every node (crs) and call dfs function on it
If the dfs function returns false, we will return an empty array
If we make it through all the nodes (crs) without finding loops, we will return the res array containing the topSort
which will contain the order to take all courses

DFS function:
Parameters:
crs the node we currently considering

Base cases:
If node is the path set, immediately return false, we have found a cycle
If the node is in the visited set, we can return true, because we know this node doesn't have any cycles

Recursive cases:
Add node to current path set

Call dfs recursively on neighbor (prereq) nodes
If they return false, immediately return false because there is a loop

Backtrack, remove current node from path set
Add to visited set, because we know none of the nodes in paths from this node have loops. 
This node is "validated", so we don't want to waste time checking it again

Push the current node onto the res array

Return true

TC: O(v + e) we call dfs on every node, and on every neighbor (edge)
SC: O(v + e) for the adjacency list which holds every node and edge
 */
