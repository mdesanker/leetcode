/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
// Quick select
var kthLargestLevelSum = function (root, k) {
  // level order traversal of tree
  // TC: O(n) - traverse every node
  // SC: O(n) - worst case scenario, queue contains every node in tree
  if (!root) return 0;
  const tree = [];
  const q = [root];

  while (q.length) {
    let len = q.length,
      levelSum = 0;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      levelSum += node.val;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    tree.push(levelSum);
  }

  // edge case - if k is out of range
  if (k > tree.length) return -1;

  // quick select
  // Time: O(n) on average, O(n^2) in worst case
  // Space: O(1)
  k = tree.length - k;

  function quickSelect(l, r) {
    let pivot = tree[r],
      i = l;

    for (let j = l; j < r; j++) {
      if (tree[j] <= pivot) {
        [tree[i], tree[j]] = [tree[j], tree[i]];
        i++;
      }
    }
    [tree[i], tree[r]] = [tree[r], tree[i]];

    if (i < k) return quickSelect(i + 1, r);
    else if (i > k) return quickSelect(l, i - 1);
    else return tree[i];
  }

  return quickSelect(0, tree.length - 1);
};

// TC: O(n)
// SC: O(n)

// Built in sort
var kthLargestLevelSum = function (root, k) {
  // level order traversal of tree
  // TC: O(n) - traverse every node
  // SC: O(n) - worst case scenario, queue contains every node in tree
  if (!root) return 0;
  const tree = [];
  const q = [root];

  while (q.length) {
    let len = q.length,
      levelSum = 0;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      levelSum += node.val;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    tree.push(levelSum);
  }

  // sort
  // TC: O(nlogn) - language dependent
  // SC: O(logn) - language dependent
  tree.sort((a, b) => b - a);
  return tree[k - 1] || -1;
};

// TC: O(nlogn)
// SC: O(logn)

// Min heap
var kthLargestLevelSum = function (root, k) {
  if (!root) return 0;
  const minHeap = new MinPriorityQueue();
  const q = [root];
  let levels = 0;

  while (q.length) {
    let len = q.length,
      levelSum = 0;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      levelSum += node.val;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    minHeap.enqueue(levelSum);
    if (minHeap.size() > k) minHeap.dequeue().element;
    levels++;
  }
  return k > levels ? -1 : minHeap.front().element;
};

// TC: O(nlogn) heap push is O(logk), and a value for every node is pushed in worst case
// SC: O(n) heap contains value for every node in worst case
