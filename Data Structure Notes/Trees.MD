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
