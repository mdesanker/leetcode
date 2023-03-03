/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
// Binary Search and Priority Queue
var kWeakestRows = function (mat, k) {
  const ROWS = mat.length,
    COLS = mat[0].length;

  function bs(row) {
    let l = 0,
      r = COLS;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      if (row[mid] === 0) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }

  const maxHeap = new MaxPriorityQueue();

  for (let r = 0; r < ROWS; r++) {
    const str = bs(mat[r]);
    // multiply str by 100 because that is the limit for length of row and col
    // this is a limitation of JavaScript heap only being able to use one value for weight
    const val = str * 100 + r;
    maxHeap.enqueue(val);
    if (maxHeap.size() > k) maxHeap.dequeue().element;
  }

  // map each entry to entry.element % 100 to convert back to array index
  return maxHeap
    .toArray()
    .reverse()
    .map((x) => x.element % 100);
};

// Time: O(r * (logc + logk) + k) = O(r * (logc + logk)) where k is size of heap. rlogc to find str of each row, rlogk to add every str to heap
// Space: O(k)

// Binary Search and Sorting
var kWeakestRows = function (mat, k) {
  const ROWS = mat.length,
    COLS = mat[0].length;

  const str = [];

  function bs(row) {
    let l = 0,
      r = COLS;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      if (row[mid] === 0) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }

  for (let r = 0; r < ROWS; r++) {
    str.push([r, bs(mat[r])]);
  }

  str.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  return str.slice(0, k).map((x) => x[0]);
};

// Time: O(rlogc + rlogr) = O(r(logc + logr)) = O(rlog(rc))
// Space: O(r)

// Linear Search and Sorting
var kWeakestRows = function (mat, k) {
  const ROWS = mat.length;

  const str = [];

  for (let r = 0; r < ROWS; r++) {
    str.push([r, mat[r].reduce((a, b) => a + b)]);
  }

  str.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  return str.slice(0, k).map((x) => x[0]);
};

// Time: O(r * c + rlogr) = O(r * (c + logr))
// Space: O(r)
