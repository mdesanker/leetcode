/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  const nodes = [];
  while (head) {
    nodes.push(head.val);
    head = head.next;
  }

  function build(arr) {
    if (!arr.length) return null;
    const mid = Math.floor(arr.length / 2);
    const root = new TreeNode(arr[mid]);

    root.left = build(arr.slice(0, mid));
    root.right = build(arr.slice(mid + 1));
    return root;
  }

  return build(nodes);
};

// Time: O(n) - O(n) traverse linked list, O(n) convert every element to tree node
// Space: O(n) - O(n) array to store list nodes, recursive stack building tree is height of tree O(logn) for balanced binary tree

var sortedListToBST = function (head) {
  function getLen(head) {
    let len = 0;
    while (head) {
      len++;
      head = head.next;
    }
    return len;
  }

  const len = getLen(head);
  console.log(len);

  function convert(l, r) {
    // base case - invalid
    if (l > r) return null;

    const mid = Math.floor((l + r) / 2);

    let left = convert(l, mid - 1);

    const node = new TreeNode(head.val);
    node.left = left;

    head = head.next;

    node.right = convert(mid + 1, r);
    return node;
  }
  return convert(0, len - 1);
};

// Time: O(n) traverse every node
// Space: O(logn) space needed for recursive stack (height of balanced binary tree)
