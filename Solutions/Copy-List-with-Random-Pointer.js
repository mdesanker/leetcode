/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */

const copyRandomList = function (head) {
  if (!head) return null;

  // create a map of each node pointing to its clone
  const clones = new Map();

  let current = head;
  while (current) {
    clones.set(current, new Node(current.val));
    current = current.next;
  }

  // set next and random pointers for each clone
  current = head;
  while (current) {
    // get clone of current pointer and set next to clone of current pointer's next
    clones.get(current).next = clones.get(current.next) || null;
    // repeat for random pointer
    clones.get(current).random = clones.get(current.random) || null;
    current = current.next;
  }

  // return head of clone list
  return clones.get(head);
};

// Time: O(N) each pass iteratres through entire list
// Space: O(N) store each node inside hash map

/**
Will do this in two passes of the linked list
First pass: create duplicates of every node
Second pass: set next and random pointers on each node

Use a map to link nodes to their clones
Iterating through list, set current to a new node with current.val

Iterate through list again
Get clone of current from map and set its next to what you return from getting current.next from map or null

clones.get(current).next = clones.get(current.next) || null;

Do the same for the random pointer;

Return the clone of the head node, not the head node itself

TC: O(n) pass through the linked list twice O(n + n) simplifies to O(n)
SC: O(n) map used to store old nodes mapped to new nodes with n size
*/
