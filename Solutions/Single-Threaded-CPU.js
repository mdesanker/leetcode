/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function (tasks) {
  tasks = tasks.map((task, index) => [...task, index]);
  tasks.sort((a, b) => b[0] - a[0]); // sort descending by enqueueTime so can pop from tasks list

  const minHeap = new MinPriorityQueue({
    compare: (a, b) => {
      if (a[1] !== b[1]) return a[1] - b[1]; // first priority: ascending processingTime
      return a[2] - b[2]; // second priority: smaller index
    },
  });

  let currentT = tasks[tasks.length - 1][0]; // get earliest processing time
  const res = [];

  while (tasks.length || minHeap.size()) {
    // enqueue task if current time is >= enqueueTime of the task
    while (tasks.length && currentT >= tasks[tasks.length - 1][0]) {
      minHeap.enqueue(tasks.pop());
    }
    if (minHeap.size()) {
      // dequeue task from minHeap
      const [et, pt, i] = minHeap.dequeue(); // use compare so don't need .element
      // increment current time with processing time for task
      currentT += pt;
      // push index to res array
      res.push(i);
    } else if (tasks.length) {
      // if heap is empty but still tasks remaining, move time to time for next task
      currentT = tasks[tasks.length - 1][0];
    }
  }
  return res;
};

// n: tasks.length

// Time: O(nlogn) sorting tasks array, every heap operation is logn time and these are done for every task
// Space: O(n) minHeap will hold at most every task
