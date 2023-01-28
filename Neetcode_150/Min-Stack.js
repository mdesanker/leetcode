const MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  if (this.minStack.length === 0) this.minStack.push(val);
  else
    this.minStack.push(Math.min(val, this.minStack[this.minStack.length - 1]));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

// Time: O(1) all operations are constant time - push, pop, top, getMin
// Space: O(n) worst case scenario every operation is push

/** 
Initialize empty array for stack and minStack

Push:
stack - push val onto end of stack array
minStack - if minStack is empty, the push onto minStack, otherwise push the min of last value in minStack and value parameter
This keeps the minimum value in the stack on top and accessible in O(1) time

Pop:
Pop from both stack and minStack

Top:
return value at last index of stack

getMin:
return value at last index of minStack because this will be the smallest value

TC: O(1) all operations are constant time - push, pop, top, getMin
SC: O(n) worst case scenario every operation is push
*/
