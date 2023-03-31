/**
 * @param {number} n
 * @param {number[]} wells
 * @param {number[][]} pipes
 * @return {number}
 */

/**
 Key Insight:
Standard MST problems have graphs where only the edges are weighted, but here the vertices are weighted as well.
We can convert this into a standard MST problem by adding a virtual vertex.
The weight of the edge from the virtual vertex to every other vertex, will be the weight of the vertex.
In this way, we remove the weights of the vertices, and create a graph with only weighted edges
 */

// Prim's Algorithm
var minCostToSupplyWater = function (n, wells, pipes) {
  // build adj list
  const adj = {};
  for (let i = 0; i < n + 1; i++) adj[i] = [];
  // add edges to and from virtual vertex (0)
  // note that wells array is 0-indexed, but the nodes are 1-indexed
  for (i = 0; i < wells.length; i++) {
    adj[0].push([i + 1, wells[i]]);
    adj[i + 1].push([0, wells[i]]);
  }
  // add bidirectional edges in pipes array
  for (let [src, dst, weight] of pipes) {
    adj[src].push([dst, weight]);
    adj[dst].push([src, weight]);
  }

  // standard Prim's implementation starting from virtual vertex
  const visited = new Set();
  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([0, 0], 0);

  let res = 0;

  while (visited.size < n + 1) {
    const [n1, w1] = minHeap.dequeue().element;
    if (visited.has(n1)) continue;

    visited.add(n1);
    res += w1;

    for (let [n2, w2] of adj[n1]) {
      if (!visited.has(n2)) {
        minHeap.enqueue([n2, w2], w2);
      }
    }
  }
  return res;
};

/**
Time: O((v + e)log(v + e))
    Build adj list by iterating through wells (vertices) and pipes (edges) O(v + e)
    Building MST, we iterate through every edge in worst case (v + e). Each edge is added O(log(v + e)) and popped O(1) from heap
      This is a total of O((v + e)log(v + e))
Space: O(v + e)
    Graph is O(v + 2e) for bidirectional, simplifies to O(v + e)
    Visited set is O(v)
    Heap is O(v + e) in worst case it holds every edge
 */

// Kruskal's Algorithm with Union Find
var minCostToSupplyWater = function (n, wells, pipes) {
  function find(n) {
    if (n === par[n]) return n;
    return (par[n] = find(par[n]));
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

  const par = [];
  for (let i = 0; i < n + 1; i++) par.push(i);
  const rank = new Array(n + 1).fill(1);

  const minHeap = new MinPriorityQueue();

  // add edges for virtual vertex to minHeap
  for (let i = 0; i < wells.length; i++) {
    minHeap.enqueue([0, i + 1, wells[i]], wells[i]);
    minHeap.enqueue([i + 1, 0, wells[i]], wells[i]);
  }
  // add edges for pipes array to minHeap
  for (let [src, dst, weight] of pipes) {
    minHeap.enqueue([src, dst, weight], weight);
    minHeap.enqueue([dst, src, weight], weight);
  }

  let res = 0;
  let edges = 0;

  while (minHeap.size() && edges < n) {
    const [n1, n2, weight] = minHeap.dequeue().element;
    if (union(n1, n2)) {
      res += weight;
      edges++;
    }
  }
  return res;
};

/**
Time: O((v + e)log(v + e)) 
    Every edge is added to minHeap, and every heap push operation is log(v + e)
    Iterate through every edge in heap and invoke union operation, which is O((v + e)log*(v))
Space: O(v + e) 
    Parent and rank arrays for union find are O(v)
    Heap contains every edge O(v + e) 
 */
