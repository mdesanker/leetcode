/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// Brute force
var mergeKLists = function (lists) {
  // create an array to store all nodes
  const nodes = [];
  // for every list in lists, push all node vals into node array
  for (let list of lists) {
    while (list) {
      nodes.push(list.val);
      list = list.next;
    }
  }

  // create dummy node to build new list off of
  const dummy = new ListNode();
  let current = dummy;
  // sort node vals in increasing order
  nodes.sort((a, b) => a - b);

  // iterate through sorted nodes, and add new nodes onto res list
  for (let val of nodes) {
    current.next = new ListNode(val);
    current = current.next;
  }

  return dummy.next;
};

// TC: O(nlogn)
//    Collect all values O(n)
//    Sort values O(nlogn)
//    Ierating to create new list O(n)
// S: O(n)
//    Sorting costs O(n) depending on algorithm
//    Creating new linked list O(n)

// Priority Queue
var mergeKLists = function (lists) {
  // push every node in every list into a min priority queue
  const minHeap = new MinPriorityQueue();
  for (let list of lists) {
    while (list) {
      minHeap.enqueue(list.val);
      list = list.next;
    }
  }

  const dummy = new ListNode();
  let current = dummy;

  // build new list by dequeueing next smallest element and creating a list node
  while (minHeap.size()) {
    current.next = new ListNode(minHeap.dequeue().element);
    current = current.next;
  }

  return dummy.next;
};

// TC: O(nlogk)
//    Comparison cost reduced to O(logk) for every pop and inserting into priority queue
//    Finding smallest node in PQ is O(1)
//    N nodes in final linked list
// SC: O(n)
//    Creating new linked list O(n)
//    Priority queue takes O(n) space

// Divide and Conquer
var mergeKLists = function (lists) {
  // helper function to merge two sorted lists (leetcode easy)
  function mergeTwoLists(l1, l2) {
    const dummy = new ListNode();
    let curr = dummy;

    while (l1 && l2) {
      if (l1.val < l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }

    curr.next = l1 || l2;

    return dummy.next;
  }

  // edge case
  if (lists.length === 0) return null;

  // while at least two lists, pop last two lists and merge, then push merged list onto lists
  while (lists.length > 1) {
    l1 = lists.pop();
    l2 = lists.pop();
    const l3 = mergeTwoLists(l1, l2);
    lists.push(l3);
  }

  // return remaining list
  return lists[0];
};

// TC: O(n)
//    mergeTwoLists: O(min(n, m))
//    pop: O(1)
//    push: O(1)
// SC: O(n)
//    O(n) for the merged list

// Divide and Conquer II
var mergeKLists = function (lists) {
  // helper function to merge two sorted lists (leetcode easy)
  function mergeTwoLists(l1, l2) {
    const dummy = new ListNode();
    let curr = dummy;

    while (l1 && l2) {
      if (l1.val < l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }

    curr.next = l1 || l2;

    return dummy.next;
  }

  let prev = null;

  for (let i = 0; i < lists.length; i++) {
    prev = mergeTwoLists(prev, lists[i]);
  }

  return prev;
};

// TC: O(n)
//    mergeTwoLists: O(min(n, m))
//    pop: O(1)
//    push: O(1)
// SC: O(n)
//    O(n) for the merged list

/**
Merge two lists at a time until there is only one list left

Build function to merge two lists (leetcode easy)

Initialize a variable prev to null, all lists will be merged into this one
For each list in lists, set prev equal to prev and lists[i] merged
Return prev at the end

If lists is empty, then initial value of prev (null) will be returned

TC: O(n) iterate through every list in lists once at a time while it's merged into prev
SC: O(n) for the merged list
 */
