/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  // helper function to find end of group
  function getKth(curr, k) {
    while (curr && k > 0) {
      curr = curr.next;
      k--;
    }
    return curr;
  }

  // use dummy because potentially modifying head node
  const dummy = new ListNode(0, head);
  // store pointer before start of curret group
  let groupPrev = dummy;

  while (true) {
    let kth = getKth(groupPrev, k);
    // if not k values left in list
    if (!kth) break;

    // store node after group
    let groupNext = kth.next;

    // reverse group
    let prev = kth.next,
      curr = groupPrev.next;
    while (curr !== groupNext) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    // groupPrev.next started as first node in group, but will end up as last node
    let tmp = groupPrev.next;
    // kth is now beginning of group
    groupPrev.next = kth;
    // now groupPrev is set to last node in group and ready for next group
    groupPrev = tmp;
  }

  return dummy.next;
};

// TC: O(n) iterate through linked list once
// SC: O(1) no additional memory needed

/**
YOU REALLY NEED TO DRAW THIS PROBLEM

Create a dummy node pointing to head, because head node will have to be modified and it will be easier if its not a terminal node
We will need three pointers outside of the reverse list operation 

groupPrev: the node before a group of k nodes
groupNext: the node after a group of k nodes
kth: the last node in a group of k nodes

groupPrev and groupNext and needed so we can connect the reversed portion to the remainder of the list
kth is the starting point for the reversal

To start, groupPrev is initialized to the dummy node

Loop while true and break when we no longer have at last k nodes left

Using a predefined helper function, find the kth node
Pass two parameters, the starting node and number of nodes to increment (k)
While node exists (not null) and k > 0, move to node.next and decrement k

function findKth(current, k) {
  while (current && k > 0) {
    current = current.next;
    k--;
  }
  return current;
}

If kth node is null, it means we do not have enough nodes left in the list to reverse. Time to break out of while true loop

Initialize groupNext to kth.next

Now we will reverse the portion between groupPrev and groupNext
Initialize prev to groupNext as this is where head of reversed list will point
Initialize curr to start of section to reverse (groupPrev.next)
Loop until curr reaches the end of the section to reverse

let prev = groupNext;
let curr = groupPrev.next;

while (curr !== groupNext) {
  let next = curr.next;
  curr.next = prev;
  prev = curr;
  curr = next;
}

groupPrev.next was initially pointing to beginning of the group, but now it is pointing to the end of the group
Inversely, kth was pointing to the end of the group, now it points to the beginning of the group.

Save groupPrev.next in a temp variable so we can save that position
Update groupPrev.next = kth (new beginning of reversed section)
Update groupPrev = temp (temp stored last node in reversed section, so this will become new groupPrev for next section)

Return dummy.next to return head of new list

TC: O(n) we iterate through the entire list once
SC: O(1) only constant memory is needed to store pointers
 */
