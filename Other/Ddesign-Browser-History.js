// DLL node class
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  // 'homepage' is first visited url
  this.head = new Node(homepage);
  this.current = this.head;
};

// Time: O(1)
// Space: O(1)

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
  // create node for new visit
  const node = new Node(url);
  // insert new node and move current pointer
  this.current.next = node;
  node.prev = this.current;
  this.current = node;
};

// Time: O(l) where l is length of url
// Space: O(l * n)

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
  // decrement pointer while prev node is not null
  while (steps > 0 && this.current.prev !== this.head) {
    this.current = this.current.prev;
    steps--;
  }
  return this.current.val;
};

// Time: O(min(m, n)) depending on how many steps we can take
// Space: O(1)

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
  // increment pointer while next node is not null
  while (steps > 0 && this.current.next) {
    this.current = this.current.next;
    steps--;
  }
  return this.current.val;
};

// Time: O(min(m, n)) depending on how many steps we can take
// Space: O(1)
