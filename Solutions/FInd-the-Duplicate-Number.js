/**
 * @param {number[]} nums
 * @return {number}
 */

const findDuplicate = function (nums) {
  let slow = 0,
    fast = 0;

  // Floyd's algorithm
  // slow and fast pointer to find intersection point (whether there is a cycle)
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) break;
  }

  // leave first slow and start another slow pointer at head, increment until they intersect to find beginning of cycle
  let slow2 = 0;
  while (true) {
    slow = nums[slow];
    slow2 = nums[slow2];
    if (slow === slow2) return slow;
  }
};

// Time: O(n)
// Space: O(1)

/**
**This is a trick problem**
Flloyd's algorithm can be used to solve in constant space by reducing this to finding the beginning of a linked list cycle

Visualize it as each node of each index points to the node of that value at that index

[2, 6, 4, 1, 3, 1, 5]

Node 0 points to node 2
Node 1 points to node 6

There is a cycle because both node 3 and node 5 point to node 1

Initiliaze slow and fast pointer to 0
Increment slow and fast until they are equal
Then initialize a slow2 pointer
Increment slow and slow2 until they are equal
Then return slow ro slow2

TC: O(n) both phases run in O(n) time
SC: O(1) no additional memory needed
 */
