/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
// Bellman-Ford Algorithm
var findCheapestPrice = function (n, flights, src, dst, k) {
  // Bellman - Ford
  // create array for every node and set cost to get to each node to inifinity for each except source node
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;

  // loop will run k + 1 times where k is number of stops
  for (let i = 0; i < k + 1; i++) {
    // copy price array so can compare against original prices
    const tmpPrices = prices.slice();

    // s = source, d = destination, p = price
    for (let [s, d, p] of flights) {
      // price of s = Infinity for nodes we cannot reach yet
      if (prices[s] === Infinity) continue;
      // if cost to get to src + cost to get to next node (p) is less than current cost to get tp d, update
      if (prices[s] + p < tmpPrices[d]) {
        tmpPrices[d] = prices[s] + p;
      }
    }
    // set prices to new prices
    prices = tmpPrices;
  }
  // if can't make it to dst in k stops return -1 otherwise return price
  return prices[dst] === Infinity ? -1 : prices[dst];
};

// Time: O((e + v) * k) iterate of every edge k times (e * k) and we copy price to tmpPrices k times (v * k)
// Space: O(v) for prices and tmpPrices arrays

/**
Djikstra's alg a little more complicated to implement with limited steps, and not as efficient because have to iterate more often than k times to find suitable answer

TC: of Bellman-Ford alg is O(e * v), O(e * k) in this case because number of steps is limited

Bellman-Ford is similar to a BFS approach. Bellman-Ford can handle negative weights (Djikstra's cannot)

Start at src node, and then do a BFS and track min price to get to every node that we have visited or can visit while moving to dst.
Allowed k stops/layovers, so we will do k + 1 layers of BFS

We initially set cost of every node to Infinity, because they have not been reached yet

prices = new Array(n).fill(Infinity);

If we start at src node, then the cost to get to src node is 0, so set price[src] = 0;

We do NOT only traverse neighbors, we check EVERY edge in the graph

Checking edge:
[src, dst, cost]
We check if we have found a new minimum cost to reach the dst node
The cost to reach dst node is price[src] + price of current edge
This is compared against the most up-to-date price of the dst node, which is in tmpPrices, not prices
This is incase we have another edge that was traversed previously that points to the same node

When we update this value, we will update it in a clone of the prices array, tmpPrices
This is because we do not want to modify price values before this level of BFS is done

If the cost to get to src node is Infinity, then we cannot update the price of dst
price[src] + price[dst] = Infinity + 100
This will not be less than Infinity in prices[dst]
This is not technically a BFS because we check all edges, not just neighbors, but because of this logic, we will only be able to update prices for nodes that are neighbors

After we check all edges, in this iteration, we overwrite prices with tmpPrices

We run this loop k + 1 times

TC: O(e * k + v * k) or O((e + v) * k) we loop k times, and every loop, we iterate over every edge (e * k). Every loop we also duplicate the prices array, which contains every node (v * k)
SC: O(v) we use a prices and tmpPrices array which contain every node (vertex)
 */

// Djikstra's Algorithm
var findCheapestPrice = function (n, flights, src, dst, k) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [src, dst, cost] of flights) adj[src].push([dst, cost]);

  const visited = new Set();
  const minHeap = new MinPriorityQueue();
  minHeap.enqueue([src, 0, 0], 0); // [node, cost, steps], cost

  while (minHeap.size()) {
    const [n1, cost1, step] = minHeap.dequeue().element;
    // we can re-visit nodes if we are taking a different path (they will have different costs)
    // therefore cannot just use node as the key in visited set
    if (visited.has(`${n1}#${cost1}`)) continue;
    // if this step has taken too many steps, we must skip and try next option in heap
    if (step > k + 1) continue;

    visited.add(`${n1}#${cost1}`);
    // if the current node is the destination, return the accumulated cost
    if (n1 === dst) return cost1;

    // add neighbors into heap
    for (let [n2, cost2] of adj[n1]) {
      if (!visited.has(`${n2}#${cost1 + cost2}`)) {
        minHeap.enqueue([n2, cost1 + cost2, step + 1], cost1 + cost2);
      }
    }
  }
  // if we don't find a valid answer after clearing the heap, we return -1
  return -1;
};

/**
We need to find the cheapest path from source to destination within k stops which is a shortest path question
We can use Djikstra's algorithm as one of the ways to find the shortest path between two nodes of a graph

We start by building the adjacency list of the graph
We have the number of nodes and the flights array lists the edges and their weights
We will create a key for every src, and in the arrays mapped to each key we will push a pair of values, containing the destination and cost

We will use a set to track which nodes have been visited and their weights
A minHeap will be used to store neighbors, so we can prioritize edges with the lowest cost when we are considering options
When we push nodes and costs onto the heap, we also need to track the steps that have been taken
If a destination exceeds the number of allowed steps, then we cannot consider it
We will start the step counter at 0 for the src that is initially pushed onto the heap

While there are elements in the heap, we will continue looping until we find a solution. Otherwise we return -1

We will pull the element from the top of the minHeap, which will have the lowest cost, and destructure it into [node, cost, steps]

There are two conditions that will cause us to skip this element:
1. If the combination of node and cost is already in the visited set
We might end up revisiting nodes if we take a different path, so we need to pair the node with either the step count or cost 
so we can tell when we have taken a different path to get to the same node

2. If the steps for the element pulled from the heap is greater than k + 1
k is the number of layovers we are allowed to take, so if k = 1 layover, then we actually have 2 steps (k + 1) we can take
Once we reach 3 steps, we have exceeded the limit

If we make it through the base cases that cause us to skip this value, we know we can consider this value
Add it to the visited set (combination of node and steps/cost)

We want to check if we found a valid answer
If the current node is equal to the destination node, then we have a result, and we can return the cost to get to this point

If we haven't reached our destination yet, then we need to push neighbors onto the heap to continue checking for a vaid solution
For each neighbor node, if it isn't already in visited set, we enqueue the node, its cost added to the cost of the parent node, 
and increment the step counter
We pass the combined cost as the weight when we enqueue this value

If we make it through the heap and there are no more values to consider and we haven't found a solution, then a solution is not possible
Return -1

TC: O(v + e) we potentially have to iterate over every vertex and for every vertex we then iterate over all neighbors (all edges)
SC: O(v + e) for the adjacency list
  O(v) for the visited set
  O(v) for the heap
 */

// Time: O(e * k) where e is number of edges and k is number of stops
// Space: O(n) for price and tempPrice arrays
