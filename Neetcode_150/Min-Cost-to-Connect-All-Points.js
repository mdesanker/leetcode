/**
 * @param {number[][]} points
 * @return {number}
 */
// Prim's Algorithm
var minCostConnectPoints = function (points) {
  const N = points.length;

  // build adjacency list
  const adj = {}; // i: list of [cost, node]
  // map each node ot empty list
  for (let i = 0; i < N; i++) {
    adj[i] = [];
  }

  // compare each point to every other point in graph
  for (let i = 0; i < N; i++) {
    let [x1, y1] = points[i];
    for (let j = i + 1; j < N; j++) {
      let [x2, y2] = points[j];
      // calculate manhattan distance
      let cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      // add both ways because undirected
      adj[i].push([cost, j]);
      adj[j].push([cost, i]);
    }
  }

  let res = 0;
  const visit = new Set();
  // use minHeap to find node with next lowest cost
  const minHeap = new MinPriorityQueue();
  // first node is the origin
  minHeap.enqueue([0, 0], 0);

  // loop until every node has been connected
  while (visit.size < N) {
    // pop next node from heap
    const [cost, node] = minHeap.dequeue().element;
    // skip if point already visited
    if (visit.has(node)) continue;

    // add cost to result and add to visited
    res += cost;
    visit.add(node);

    // check every neighbor in adjacency list
    for (const [neiCost, nei] of adj[node]) {
      if (!visit.has(nei)) {
        // for every new nei, push to heap, ordering by cost
        minHeap.enqueue([neiCost, nei], neiCost);
      }
    }
  }
  return res;
};

// Time: O(n^2 * logn) where n^2 is number of edges and log n is for every heap operation (every node is added to queue)
// Space: O(n^2 + n) -> O(n^2) worst case push n^2 edges into heap, and mark n nodes as visited

/**
Question asks for the minimum cost to make all points connected - classic Minimum Spanning Tree (MST) question. For this, the two most common algs are Prim's and Kruskal's. Prim's is simpler and usually more efficient than Kruskal's

First we will need to build the edges (adj list) and then we can use Prim's to calculate the min cost

TC: O(n^2 * logn) n^2 for the number of edges and logn for the heap operations

This alg uses a minHeap to determine the next point to connect based on distance/cost

Solution:
Adj list:
First we need to build the adjacency list. Every point can potentially connect to every other point. We will also calculate the distance between all possible pairs. 

We will use nested for-loops to do this so we consider every possible pair of nodes
We will map every node in the adj list to an array, and the arrays will hold pairs of values for every point
Every point will be associated with a weight, or cost, it requires to move from the key, starting node, to the destination node.

adj = {node1: [[cost, node2], [cost, node3]]};

Then we will use BFS starting from any node (it does not matter which, but will be easy to start from the origin) to determine which next node has the lowest cost

We will need a visited set and a minimum heap
Visited set will keep track of which nodes we have already connected
Min heap will tell us which neighbor has the lowest cost to connect to
We will also need to initialize a result counter variable to add costs to as we make connections

We will push the origin node on to the heap so we have a starting point (but we could start with any point, as mentioned before)

We will be done when we have connected all points in the graph, and the visited set counts the number of nodes that have been connected
There, we loop while visited.size < points.length

In each loop iteration, we will dequeue the cheapest node from the queue
We can destructure the new node to separate the cost and node into variables

const [cost, node] = minHeap.dequeue().element;

If this node is already connected (in the visited set), continue. We do not want to double count it

If this node is new, we will add its cost to the res counter
We also add this node to the visited set because it has been ""connected"

Then we will push it's neighbors (which is really all nodes, but will include their costs from this particular node) onto the heap, if the node is not already connected

for (let [cost, nei] of adj[node]) {
    if (!visited.has(nei)) {
        minHeap.enqueue([cost, nei], cost);
    }
}

Once all nodes have been connected, we return the res counter which accumulated the cost of connecting every node

TC: O(n^2 * logn)
    Worst case scenario, we push/pop all edges from the heap. We have n^2 edges, and every heap operation is logn
SC: O(n^2)
    Worst case we push n * (n - 1) edges into heap (~ n^2)
    n^2 edges are stored in the adj list, because every edge is stored twice (bidirectional)
 */

// Kruskal's Algorithm with Union Find
var minCostConnectPoints = function (points) {
  const n = points.length;

  const minHeap = new MinPriorityQueue();
  let res = 0;
  let edges = 0;

  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  function find(n) {
    let p = par[n];
    while (p !== par[p]) {
      par[p] = par[par[p]];
      p = par[p];
    }
    return p;
  }

  function union(n1, n2) {
    let p1 = find(n1),
      p2 = find(n2);
    if (p1 === p2) return false;
    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      rank[p2] += rank[p1];
    } else {
      par[p2] = p1;
      rank[p1] += rank[p2];
    }
    return true;
  }

  // add every edge into minHeap, ordering by increasing weight
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let i = 0; i < n; i++) {
    let [x1, y1] = points[i];
    for (let j = i + 1; j < n; j++) {
      let [x2, y2] = points[j];
      const weight = Math.abs(x1 - x2) + Math.abs(y1 - y2);

      minHeap.enqueue([i, j, weight], weight);
    }
  }

  // until we have create n - 1 edges (MST) greedily choose the lowest weight edge to union next
  while (minHeap.size() && edges < n - 1) {
    const [n1, n2, w] = minHeap.dequeue().element;
    // if we can union (connect it without creating a cycle) add weight to res and increment edge counter
    if (union(n1, n2)) {
      res += w;
      edges++;
    }
  }
  return res;
};

// Time: O(n^2 * logn^2) ~ O(eloge) where e is the number of edges, because every edge is added/removed from heap, which is loge operation
// Space: O(n^2) ~ O(e) heap holds every edge
