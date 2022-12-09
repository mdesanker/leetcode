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

/*
Time: O(N) each pass iteratres through entire list
Space: O(N) store each node inside hash map
*/
