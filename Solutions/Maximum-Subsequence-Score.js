/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
// Priority Queue
var maxScore = function (nums1, nums2, k) {
  // build array of pairs and sort by nums2 in decreasing order
  const pairs = [];
  nums1.forEach((_, i) => pairs.push([nums1[i], nums2[i]]));
  pairs.sort((a, b) => b[1] - a[1]);

  // add first k elements to minHeap and track sum
  const minHeap = new MinPriorityQueue();
  let topKSum = 0;

  for (let i = 0; i < k; i++) {
    topKSum += pairs[i][0];
    minHeap.enqueue(pairs[i][0]);
  }

  // calculate current score
  let res = topKSum * pairs[k - 1][1];

  // iterate through rest of array
  for (let i = k; i < nums1.length; i++) {
    // remove smallest integer from previous top k elements
    // then add nums1[i] to top k elements
    topKSum -= minHeap.dequeue().element;
    topKSum += pairs[i][0];
    minHeap.enqueue(pairs[i][0]);

    // update result
    res = Math.max(res, topKSum * pairs[i][1]);
  }
  return res;
};
// TC: O(nlogn) built in sort (O(nlogk) for heap operations)
// SC: O(n)
