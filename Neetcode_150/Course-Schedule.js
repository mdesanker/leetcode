/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // build adjacency list of courses and their prereqs
  const adj = {};
  for (let i = 0; i < numCourses; i++) adj[i] = [];
  for (const [crs, pre] of prerequisites) adj[crs].push(pre);

  // use a set to store all courses along the current DFS path
  const visited = new Set();

  function dfs(crs) {
    // base cases
    // course already visited, we have a loop
    // cannot topSort a cycle because of cyclic dependencies
    if (visited.has(crs)) return false;
    // course has no prereqs, we can take it
    if (adj[crs].length === 0) return true;

    // add new crs to visited
    visited.add(crs);

    // check each prereq of crs
    for (const pre of adj[crs]) {
      // if can't take the prereq, immediately return false
      if (!dfs(pre)) return false;
    }

    // remove crs from visited
    visited.delete(crs);
    // if made it this for, then all prereqs are satisfied - remove prereqs to expedite future searches
    adj[crs] = [];
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

/**
We want to find if there is a valid order to take classes so that we meet all prereqs for each course. Classic topological sort question
TopSort is a DFS algorithm on a directed acyclic graph (DAG)
We will return true if courses can be topSorted (there will not be any cycles in the graph)
If there is a cycle, we will not be able to complete requirements for one or more courses, so we will return false
This is essentially a cycle detection question

First we need to build the graph from the number of courses and prereq list 
It will be easiest to build an adjacency list, mapping nodes to their prereqs
Adjacency list will be stored in a hashmap
We will create a key (node) for every course and map it to an empty array
Then we will iterate through the prereqs array. This is essentially an array of edges in the graph
[crs, pre] pre must be completed before crs can be taken
We will push pre onto the array for key in the adj list

const adj = {};
for (let i = 0; i < n; i++) adj[i] = [];
for (let [crs, pre] of prereqs) adj[crs].push(pre);

Next we need to do DFS traversal from every node

We will use a set to track that nodes that have been visited so far in the current path

We will check each node to make sure there are no cycles from that node
If there we encounter a node that is already in the visited set, there is a cycle, we will return false
If we check every node and don't find any cycles, we will return true

Function dfs
Parameter: 
crs which is the node we are currently at

Base cases:
If this node, crs, is already in the visited set, then we have a cycle, as we came back around to a node we already visited
We return false immediately because we cannot order nodes if there is a cycle

e.g. [[0, 1], [1, 0]]

Here we have an edge going from node 0 to node 1, and another edge going from node 1 to node 0. 
First edge requires 0 to come before 1 in the traversal, while second edge requires 1 to come before 0. 
This is not possible, which is why topSort only works on directed, acyclic graphs (DAGs)

Second base case, if the current node has no prereqs, then we have reached the end of a path, we return true

Recursive cases:
We will add the current node to the visited set so it is part of the path

Then we will call dfs on all the neighbors (prereqs) of the current node (crs)
If we find a cycle in either of the neighbors, then we will immediately return false

If we do not find cycles in any of the neighbors, then this node is valid
We are backtracking, so remove the current node from the visited set
We can set the prereqs for this node to an empty array in the adj list so that we don't have to spend time 
checking the neighbors again if we need to retraverse this node in a different path
Finally we return true from the dfs function

TC: O(v + e) we call dfs on every node, and on every neighbor (edge)
SC: O(v + e) for the adjacency list which holds every node and edge
 */
