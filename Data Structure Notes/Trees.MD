# Trees

A non-linear data structure that consists of nodes in a parent/child relationship. Each node in tree can be connected to many children, but must be connected to exactly one parent, except for root node, which has no parent.

Commonly used to represent hierarchical data, e.g. file systems, JSON, HTML documents

## Table of Contents

1. [Background](#background)
2. [Traversals](#traversals)
3. [Basic Binary Tree](#basic-binary-tree-problems)

# Background

## Common Terms

- Root - the top node in a tree (must only be 1)
- Child - a node directly connected to another node when moving away from the root
- Parent - converse notion of a child
- Siblings - group of nodes with same parent
- Leaf - a node with no children
- Edge - connection between two nodes
- Neighbor - parent or child of a node
- Ancestor - a node reachable by traversing its parent chain
- Descendant - a node in the node's substree
- Degree - number of children of a node
- Degree of a tree - maximum degree of nodes in a the tree
- Distance - number of edges along the shortest path between two nodes
- Level/Depth - number of edges along the unique path between a node and the root node
- Width - number of nodes in a level

## Binary Trees

Each node can have at most 2 children

### Binary Tree Terms

- Complete binary tree - a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible
- Balanced binary tree - a binary tree in which the left and right subtrees of every node differ in height by no more than 1

## Binary Search Trees (BSTs)

- Every parent has at most two children
- Every node to the left of a parent node is always less than the parent
- Every node to the right of a parent node is always greater than the parent

- In-order traversal of BST will give you all elements in order

### Time Complexity

| Operation | Big-O     |
| --------- | --------- |
| Access    | O(log(n)) |
| Search    | O(log(n)) |
| Insert    | O(log(n)) |
| Remove    | O(log(n)) |

Space complexity of traversing balanced trees is O(h) where h is the height of the tree, which traversing very skewed trees (which is essentially a linked list) will be O(n).

# Traversals

## Level Order Traversal

Move incrementally through each row of nodes

```js
function BFS(root) {
  const res = [];
  if (!root) return res;
  const q = [root];

  while (q.length) {
    let length = q.length,
      level = [];
    for (let i = 0; i < length; i++) {
      let node = q.shift();
      res.push(node.val);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}
```

## Pre-Order Traversal

Root > Left > Right

```js
function DFSPreOrder(root) {
  const res = [];

  function traverse(node) {
    res.push(node.val);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }

  traverse(root);
  return res;
}
```

## In-Order Traversal

Left > Root > Right

```js
function DFSInOrder(root) {
  const res = [];

  function traverse(node) {
    if (node.left) traverse(node.left);
    res.push(node.val);
    if (node.right) traverse(node.right);
  }

  traverse(root);
  return res;
}
```

## Post-Order Traversal

Left > Right > Root

```js
function DFSPostOrder(root) {
  const res = [];

  function traverse(node) {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    res.push(node.val);
  }

  traverse(root);
  return res;
}
```

# Basic Binary Tree Problems

## Same Tree

```js
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

## Symmetric Tree

```js
var isSymmetric = function (root) {
  function isMirror(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    return isMirror(p.left, q.right) && isMirror(p.right, q.left);
  }

  if (!root) return true;

  return isMirror(root.left, root.right);
};
```

## Maximum Depth of Binary Tree

```js
var maxDepth = function (root) {
  if (!root) return 0;

  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

## Minimum Depth of Binary Tree

```js
var minDepth = function (root) {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;

  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);

  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};
```

## Balanced Binary Tree

```js
var isBalanced = function (root) {
  function dfs(node) {
    if (!node) return [true, 0];

    let left = dfs(node.left);
    let right = dfs(node.right);

    const balanced = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

    return [balanced, 1 + Math.max(left[1], right[1])];
  }
  return dfs(root)[0];
};
```

## Merge Two Binary Trees

```js
var mergeTrees = function (root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;

  // merge both roots into root1
  root1.val = root1.val + root2.val;

  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);

  return root1;
};
```

## Diameter of Binary Tree

```js
var diameterOfBinaryTree = function (root) {
  let max = 0;

  function dfs(node) {
    if (!node) return 0;

    let left = dfs(node.left);
    let right = dfs(node.right);

    max = Math.max(max, left + right);

    return 1 + Math.max(left, right);
  }

  dfs(root);
  return max;
};
```

## Binary Tree Tilt

```js
var findTilt = function (root) {
  let count = 0;

  function valueSum(node) {
    if (!node) return 0;

    let left = valueSum(node.left);
    let right = valueSum(node.right);

    let tilt = Math.abs(left - right);
    count += tilt;

    return left + right + node.val;
  }

  valueSum(root);
  return count;
};
```

## Invert Binary Tree

```js
var invertTree = function (root) {
  if (!root) return null;

  let tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};
```
