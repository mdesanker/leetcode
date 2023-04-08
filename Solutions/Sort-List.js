/**
Solution: Sort array of node vals and rebuild list
 */
// Built in sort
var sortList = function (head) {
  if (!head) return null;

  const nodes = [];
  let curr = head;
  while (curr) {
    nodes.push(curr.val);
    curr = curr.next;
  }

  nodes.sort((a, b) => a - b);

  const dummy = new ListNode(0);
  curr = dummy;

  for (let node of nodes) {
    curr.next = new ListNode(node);
    curr = curr.next;
  }
  return dummy.next;
};
// TC: O(nlogn)
// SC: O(n)

// Heap sort
var sortList = function (head) {
  if (!head) return null;

  const minHeap = new MinPriorityQueue();
  let curr = head;
  while (curr) {
    minHeap.enqueue(curr.val);
    curr = curr.next;
  }

  const dummy = new ListNode(0);
  curr = dummy;

  while (minHeap.size()) {
    curr.next = new ListNode(minHeap.dequeue().element);
    curr = curr.next;
  }
  return dummy.next;
};
// TC: O(nlogn)
// SC: O(n)
