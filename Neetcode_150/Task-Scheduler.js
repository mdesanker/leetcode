/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  // count frequency of each task
  const count = {};
  for (const task of tasks) count[task] = (count[task] || 0) + 1;

  // add frequencies of each task to maxHeap
  const maxHeap = new MaxPriorityQueue();
  for (const val of Object.values(count)) maxHeap.enqueue(val);

  let time = 0;
  const q = []; // [count, idleTime];

  while (maxHeap.size() || q.length) {
    time++;

    if (maxHeap.size()) {
      // remove first element from maxHeap, and subtract 1 because one instance is consumed
      const count = maxHeap.dequeue().element - 1;
      // if count remaining, add to queue to be used again
      if (count !== 0) q.push([count, time + n]); // idleTime = time + n
    }

    // check if first item in queue is ready to be used
    if (q.length && q[0][1] === time) {
      // remove from queue and add to maxHeap
      maxHeap.enqueue(q.shift()[0]);
    }
  }
  return time;
};

// Time: O(n) we have to iterate through entire array of tasks to count freq. Heap operations are each logn, but because max heap size is 26,
//   heap operations are log26 which reduces to O(1) time complexity
// Space: O(1) heap and hashmap are max 26 entries large

/**
 * Approach 1: Heap and Queue
We want to build a sequence of when to do tasks and the most efficient way to do this will be to use the most numerous tasks first
A max heap can be used to get the most frequent task with O(1) time complexity
A queue can be used to keep track of which task we can use next
We will store arrays of two values in the cue, the remaining number of times a task needs to be done (count) and the time a task can be repeated
This will be the current time + the cooldown period

Use a hashmap to cound the freq of every task, then load the freq of every task into a maxHeap

Initialize timer to 0
Initialize a queue

While maxHeap has elements or queue has elements
Increment time

We will pop most freq task from heap and "perform" it - decrement its count by 1 and push it onto queue with time it can be repeated 
(if it's count isn't 0, in which case we do not need to consider it again)

Then we check if there any tasks in the queue which are done cooling down
If there are items in the queue, and the first item's wait equals the current time, we can pop it and add its count to the heap

After we have completed all tasks in heap and queue, we return the time counter

TC: O(n) heap operations are O(logn) time complexity, where n is the size of the heap. Since we have at most 26 tasks, this is O(log26) 
  which reduces to O(1) because we have a constant. We have to iterate through every task in tasks array to cound freq, which is O(n).
  Shifting elements from the front of the queue is also a O(n) operation
SC: O(1) heap and hashmap are max 26 elements long
 */

var leastInterval = function (tasks, n) {
  const frequencies = new Array(26).fill(0);
  // count frequency of every task by increasing count in array of length 26 (every index corresponds to a letter)
  for (let task of tasks) {
    // NOTE: tasks are capital letters, either convert to lower case and subtract "a".charCodeAt() or subtract "A".charCodeAt()
    frequencies[task.charCodeAt() - "A".charCodeAt()]++;
  }

  // max frequency
  const fMax = Math.max(...frequencies);
  // count the number of most freq tasks
  let nMax = 0;
  for (let count of frequencies) count === fMax && nMax++;

  return Math.max(tasks.length, (fMax - 1) * (n + 1) + nMax);
};

/**
There are two potential situations
1. most freq task is not frequent enouhg to force the presence of idle slots
2. most freq task is frequent enough to force some idle slots

1. most freq task is not frequent enouhg to force the presence of idle slots
this situation is straightforward because the number of slots is defined by the number of tasks (tasks.length)

2. most freq task is frequent enough to force some idle slots
For this situation, we need to know the freq of  the most freq task (fMax) and how many tasks have this frequency (nMax)
Then it is easy to compute with the help of a diagram

Tasks: [A, B, C, D, B, A, B, A, A, B] fMax = fA = fB = 4

Slots:
A B C A B D A B _ A B

(1 + n) * (fMax - 1) + nMax = 11

(1 + n) 1 for task A execution, n for cooling period: A _ _ => (1 + 2)
(fMax - 1) groups of "task A + cooling period: A _ _ , A _ _ , A _ _ => 3
nMax number of tasks with fMax frequency: A B => 2

TC: O(n) linear time to iterate over tasks array, linear time to find max freq, linear time to find number of max freq tasks
SC: O(1) to keep the frequency array of 26 elements
 */
