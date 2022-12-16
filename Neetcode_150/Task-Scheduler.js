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

// Time: O(n * m) iterate through input to count frequency, popping and adding every value to heap. n = number of tasks, m = idle time
// Space: O(n)
