/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// Quick Select
var findKthLargest = function (nums, k) {
  // quick select will sort elements in ascending order, so kth largest element will be kth element from the end of the array
  k = nums.length - k;

  function quickSelect(l, r) {
    // select element at index r to be the pivot
    // initialize pointer i to the beginning of window
    let pivot = nums[r],
      i = l;

    // iterate through the window
    for (let j = l; j < r; j++) {
      // if element at index j is less than or equal to pivot, we swap it with i
      // this partitions the array into two halves
      // left half - all elements less than or equal to pivot
      // right half - all elements large than pivot
      if (nums[j] <= pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        // increment i every time we make a swap
        i++;
      }
    }
    // after for loop, i will be at the correct index for the pivot, and
    // left and right half of array will be split into <= and > elements respoectively
    [nums[i], nums[r]] = [nums[r], nums[i]];

    // if i > k, we need to check the elements to the left of the current pivot
    if (i > k) return quickSelect(l, i - 1);
    // if i < k, we need to check elements to the right of current pivot
    else if (i < k) return quickSelect(i + 1, r);
    // if i === k, we return the value at this position
    else return nums[i];
  }

  // call quickSelect with initial window set to beginning and end of nums array
  return quickSelect(0, nums.length - 1);
};

// Time: O(n) on average, O(n**2) worst case scenario
// Space: O(1) sort array in place

// Built-in Sort
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
};

// Time: O(nlogn)
// Space: O(1)

// Min Heap
var findKthLargest = function (nums, k) {
  const minHeap = new MinPriorityQueue();

  for (let num of nums) {
    minHeap.enqueue(num);
    if (minHeap.size() > k) minHeap.dequeue().element;
  }

  return minHeap.front().element;
};

// Time: O(nlogk) heap operations are logk and they are done n times for every element in nums
// Space: O(k) heap holds k elements

/**
Approach 1 (Naive solution): Built-In Sort
Sort the array in descending order then return the kth element from the beginning

TC: O(nlogn) for JavaScript built-in sorting algorithm
SC: O(1) no addition memory needed

Approach 2: Min Heap
We want to find the kth largest element, so a min heap restricted to size k would give us the kth largest element at its front

Initialize a minHeap

Add num from nums array to heap
If heap size exceeds k, pop smallest element from heap

Return the smallest element in the heap after processing all elements in nums array

TC: O(nlogk) every addition and removal operation in a heap is logk (k is the size of the heap), 
  and this is repeated n times for every element in nums
SC: O(k) the heap will hold k elements

Approach 3: Quick Select
Quick select is the optimal solution because its time complexity if O(n) in the average case (O(n^2) in the worst case)

Quick select will sort elements in ascending order, so kth largest element will be kth element from the end of the array
k = nums.length - k;

Quick select function
In this function we select a pivot and partition the function into two halves
Left half contains values that are all less than or equal to the pivot, and right half contains all values greater than the pivot

The quick select function is called with a left and right pointer to mark the window we are considering
This will initially be the entire length of the array
The pivot is arbitrarily chosen to the be last element in the window, and a pointer is set to the beginning of the window, pointer i

We will iterate through the window from left up until the pivot using pointer j
If the element at j is <= pivot, then we swap it with the element at index i
The increment i

This will make sure that every element before i is <= pivot, and the final position of i after this traversal 
will be the sorted position for the pivot
Then we swap the pivot with the element at position i

If i > k, then we need to run quick select on the window to the left of i 
Else if i < k, then we need to run quick select on the window to the right of i
Else, i === k, and we can return nums[i] because this is the kth largest element in the array

TC: O(n) on average, O(n^2) in worst case 
  O(n) because we cut down the size of the array we consider in half with each quick select iteration
  n + n/2 + n/4 = 2n = n
  O(n^2) if we only sort one element of the array in each step
SC: O(1) no additional memory is needed because array is sorted in place
 */

var findKthLargest = function (nums, k) {
  function partition(left, right) {
    // pivot - num to find the correct index for
    // i - marker for end of lower portion
    let pivot = nums[right],
      i = left;

    // j - scans through partition
    for (let j = left; j < right; j++) {
      // if nums[j] less than pivot, swap into lower portion and increment i
      if (nums[j] <= pivot) {
        [nums[j], nums[i]] = [nums[i], nums[j]];
        i++;
      }
    }

    // swap pivot into position right after lower portion
    [nums[i], nums[right]] = [nums[right], nums[i]];

    // return correct index of pivot
    return i;
  }

  // kth largest element is length - k in array
  k = nums.length - k;
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    // returns index of pivot
    let pivot = partition(left, right);

    // shift window or return the kth largest num
    if (pivot < k) {
      left = pivot + 1;
    } else if (pivot > k) {
      right = pivot - 1;
    } else {
      break;
    }
  }

  return nums[k];
};

// Time: O(n) on average, O(n**2) worst case scenario
// Space: O(1) sort array in place
