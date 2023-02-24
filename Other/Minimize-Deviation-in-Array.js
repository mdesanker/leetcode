/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeviation = function (nums) {
  const maxHeap = new MaxPriorityQueue();

  // convert all nums to even and enqueue
  nums.forEach((num) => {
    if (num % 2) {
      const val = num * 2;
      maxHeap.enqueue(val);
    } else {
      maxHeap.enqueue(num);
    }
  });

  // get diff between max and min vals
  let dev = maxHeap.front().element - maxHeap.back().element;

  // loop while we have any max even number left in queue
  while (maxHeap.front().element % 2 === 0) {
    // get max even value
    const num = maxHeap.dequeue().element;

    // convert to odd and enqueue
    maxHeap.enqueue(num / 2, num / 2);

    // get minimum between prev deviation and after above conversion
    dev = Math.min(dev, maxHeap.front().element - maxHeap.back().element);
  }
  return dev;
};

// Time: O(n * logm * logn)
// Space: O(n)

/**
1. To decrease the deviation either increase the minn or decrease the maxx.
2. Now, Make every number as maximum as possible to eliminate one operation(increase the minn)
3. since every element is as maximum as possible , you can not increase any number further
4. Now we are left with just one operation decrease the maxx
5. So perform this operation as many times as u can and keep track of the min_deviation
 */
