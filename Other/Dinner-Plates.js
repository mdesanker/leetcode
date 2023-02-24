/**
 * @param {number} capacity
 */
var DinnerPlates = function (capacity) {
  this.stack = [];
  this.capacity = capacity;
  // use minHeap to track index of left most stack that isn't full so values can be added to left most stack
  this.minHeap = new MinPriorityQueue();
};

/**
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function (val) {
  // if no empty stacks, push val into new stack and end of this.stack
  if (this.minHeap.isEmpty()) {
    this.stack.push([val]);
    // if capacity > 1, then this stack is not full, can add more values potentially
    if (this.capacity > 1) {
      this.minHeap.enqueue(this.stack.length - 1);
    }
    return;
  }

  // get index of stack we will add to
  const left = this.minHeap.front().element;
  // if there is space in stack, push val
  if (this.stack[left].length < this.capacity) {
    this.stack[left].push(val);

    // check if this stack is at capacity, and if so dequeue so we don't add more values
    if (this.stack[left].length >= this.capacity) {
      this.minHeap.dequeue().element;
    }
    // else push to end of this.stack in new substack
  } else {
    const index = this.stack.length;
    this.minHeap.enqueue(index);
    this.stack.push([val]);
  }
};

/**
 * @return {number}
 */
DinnerPlates.prototype.pop = function () {
  if (this.stack.length === 0) return -1;

  // remove empty substacks from end of this.stack
  while (
    this.stack[this.stack.length - 1] &&
    this.stack[this.stack.length - 1].length === 0
  ) {
    this.stack.pop();
  }

  // if left most index in minHeap doesn't map to a valid substrack, remove it
  while (!this.minHeap.isEmpty() && !this.stack[this.minHeap.front().element]) {
    this.minHeap.dequeue().element;
  }
  // call popAtStack on last substrack in this.stack
  return this.popAtStack(this.stack.length - 1);
};

/**
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function (index) {
  if (this.stack[index] && this.stack[index].length > 0) {
    // if this substack was at capacity, and we are now removing an element, it is viable for adding values again
    if (this.stack[index].length === this.capacity) {
      this.minHeap.enqueue(index);
    }
    // pop from substack and return
    return this.stack[index].pop();
  }
  // if this substack is empty, return -1
  return -1;
};

// Time: O(logn)
// Space: O(n)
