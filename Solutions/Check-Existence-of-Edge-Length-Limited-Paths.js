// Djikstra's [TLE]
var distanceLimitedPathsExist = function (n, edgeList, queries) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [u, v, d] of edgeList) {
    adj[u].push([v, d]);
    adj[v].push([u, d]);
  }

  function bfs(start, end, limit) {
    const minHeap = new MinPriorityQueue();
    minHeap.enqueue([start, 0], 0);
    const visited = new Array(n).fill(false);

    while (minHeap.size()) {
      const [n1, d1] = minHeap.dequeue().element;
      if (visited[n1]) continue;
      if (d1 >= limit) continue;
      if (n1 === end) return true;
      visited[n1] = true;

      for (let [n2, d2] of adj[n1]) {
        if (!visited[n2]) {
          minHeap.enqueue([n2, d2], d2);
        }
      }
    }
    return false;
  }

  const res = new Array(queries.length).fill(false);
  for (let [s, d, limit] of queries) {
    if (bfs(s, d, limit)) res[i] = true;
  }
  return res;
};

// Union Find
/**
Key Insight:
After sorting query and edge arrays, we iterate through queries and connect all edges that have a distance below the limit of the current query. Then we check whether the two nodes of the query are connected.
*/
var distanceLimitedPathsExist = function (n, edgeList, queries) {
  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  function find(n) {
    if (n === par[n]) return n;
    return (par[n] = find(par[n]));
  }

  function union(n1, n2) {
    let p1 = find(n1),
      p2 = find(n2);
    if (p1 === p2) return false;
    if (rank[p1] > rank[p2]) {
      par[p2] = p1;
      rank[p1] += rank[p2];
    } else {
      par[p1] = p2;
      rank[p2] += rank[p1];
    }
    return true;
  }

  // add index to queries so we know where it goes in result array after sorting
  const queriesWithIndex = [];
  for (let i = 0; i < queries.length; i++) {
    queriesWithIndex[i] = [...queries[i], i];
  }

  // sort new queries array and edgeList by distance
  queriesWithIndex.sort((a, b) => a[2] - b[2]);
  edgeList.sort((a, b) => a[2] - b[2]);

  const res = new Array(queries.length);

  let edgesIndex = 0;
  // iterate through queries, connecting all edges that are below the limit
  for (let [p, q, limit, i] of queriesWithIndex) {
    while (edgesIndex < edgeList.length && edgeList[edgesIndex][2] < limit) {
      union(edgeList[edgesIndex][0], edgeList[edgesIndex][1]);
      edgesIndex++;
    }
    // check if the two query edges are connected
    res[i] = find(p) === find(q);
  }
  return res;
};
// TC: O(n + eloge + qlogq + (e + q)) n to initialize parent and rank arrays, eloge and qlogq to sort edgeList and queriesWithIndex, e + q for union find
// SC: O(n + q) n for parent and rank arrays, q for queriesWithIndex
