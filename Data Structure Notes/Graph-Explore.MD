# Disjoint Set

Primary use is to address the connectivity between components of a network

- The Find function: finds the root node of a given vertex
- The Union function: unions two vertices and makes their root nodes the same

## Quick Find

Make the find function faster, but add additional step to union function

In the root array, we store the root node, not the parent node

- Makes the find function O(1), but the union function O(n)
- Requires an additional step in the union function where we have to traverse the root node to update all child nodes with new root

```js
const root = [];
for (let i = 0; i < n; i++) par.push(i);
// TC: O(n) - constructor

function find(n) {
  return root[n];
}
// TC: O(1)

function union(n1, n2) {
  let r1 = find(n1),
    r2 = find(n2);
  // root nodes are same, nodes are already connected
  if (r1 === r2) return;

  // root nodes are different, update any node with r2 as root, to r1 as root
  for (let i = 0; i < root.length; i++) {
    if (root[i] === r2) {
      root[i] = r1;
    }
  }
}
// TC: O(n) to traverse root array

function connected(n1, n2) {
  // connected if root nodes are the same
  return find(n1) === find(n2);
}
// TC: O(1)

// SC: O(n) to store root array containing every vertex
```

## Quick Union

Make the union function faster, but the find function more complex. Quick union is more efficient than quick find

Store parent node instead of root node, so find function might have to traverse entire array to find root node

```js
const par = [];
for (let i = 0; i < n; i++) par.push(i);
// TC: O(n) - constructor

function find(n) {
  let p = par[n];
  while (p !== par[p]) {
    p = par[p];
  }
  return p;
}
// TC: O(n) potentially have to traverse entire parent array (skewed tree)

function union(n1, n2) {
  let p1 = find(n1),
    p2 = find(n2);
  // root nodes are the same, already connected
  if (p1 === p2) return;

  // root nodes are different, connect the nodes
  par[p2] = p1;
}
// TC: O(n) because of the find operations

function connected(n1, n2) {
  // connected if root nodes are the same
  return find(n1) === find(n2);
}
// TC: O(n) because of find operations

// SC: O(n)
```

For quick find, if we connect n elements, overall time complexity is n \* O(n) = O(n^2) (union operation is ALWAYS O(n))
For quick union, if we connect n elements, only the worst case time complexity is O(n), so overall time complexity is <= n \* O(n) = O(n^2)

## Union by Rank

With quick find and quick union, it is possible for all vertices to form a line (skewed tree) after connecting, which results in worst case
scenario for find operation for quick union. Choose parent node based on certain critera (by rank) to limit the maximum height of each vertex.
When we union, we choose the vertex with the larger rank as the root node

```js
const par = [];
for (let i = 0; i < n; i++) par.push(i);
const rank = new Array(n).fill(1);
// TC: O(n) - constructor

function find(n) {
  ...
}
// TC: O(logn) potentially have to traverse entire parent array (skewed tree)

function union(n1, n2) {
  let p1 = find(n1),
    p2 = find(n2);
  // root nodes are the same, already connected
  if (p1 === p2) return;

  // root nodes are different, connect the nodes
  if (rank[p2] < rank[p1]) {
    par[p2] = p1;
    rank[p1] += rank[p2];
  } else {
    par[p1] = p2;
    rank[p2] += rank[p1];
  }
}
// TC: O(logn) time complexity is height of the tree

function connected(n1, n2) {
  ...
}
// TC: O(logn) because of find operations

// SC: O(n)
```

## Path Compression Optimization

After finding the root node, we can update the parent node of all traversed nodes to their root node.
When we search for the root node of the same element again, we only need to traverse two elements to find its root node,
which is highly efficient. Can use recursion

```js
const par = [];
for (let i = 0; i < n; i++) par.push(i);
const rank = new Array(n).fill(1);
// TC: O(n) - constructor

function find(n) {
  // check if parent node of n is equal to itself (it is a root node)
  if (n === par[n]) return n;
  // not equal to itself, keep searching until we find the root node and update the value in the parent array
  return (par[n] = find(par[n]));
}
// TC: O(logn) potentially have to traverse entire parent array (skewed tree)

function union(n1, n2) {
  ...
}
// TC: O(logn) time complexity is height of the tree

function connected(n1, n2) {
  ...
}
// TC: O(logn) because of find operations

// SC: O(n)
```

## Optimized Disjoint Set with Path Compression and Union by Rank

N is the number of vertices in the graph. a refers to the Inverse Ackermann function. In practice, we assume this is constant.
In other words, O(aN) is regarded as O(1) on average

Using combination of union by rank and path compression optimizations, the find operation takes O(aN) time on average.
Union and connected both make calls to find, so will also take O(aN) time on average.

```js
const par = [];
for (let i = 0; i < n; i++) par.push(i);
const rank = new Array(n).fill(1);
// TC: O(n) - constructor

function find(n) {
  // check if parent node of n is equal to itself (it is a root node)
  if (n === par[n]) return n;
  // not equal to itself, keep searching until we find the root node and update the value in the parent array
  return (par[n] = find(par[n]));
}
// TC: O(aN)

function union(n1, n2) {
  let p1 = find(n1),
    p2 = find(n2);
  // root nodes are the same, already connected
  if (p1 === p2) return;

  // root nodes are different, connect the nodes
  if (rank[p2] < rank[p1]) {
    par[p2] = p1;
    rank[p1] += rank[p2];
  } else {
    par[p1] = p2;
    rank[p2] += rank[p1];
  }
}
// TC: O(aN)

function connected(n1, n2) {
  // connected if root nodes are the same
  return find(n1) === find(n2);
}
// TC: O(n * aN)

// SC: O(n)
```
