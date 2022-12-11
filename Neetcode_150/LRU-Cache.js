/**
 * @param {number} capacity
 */
// Doubly Linked List Implementation

// Create doubly linked list class
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map();
  // create head and tail nodes to wrap contents
  this.head = new Node();
  this.tail = new Node();
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

LRUCache.prototype.remove = function (node) {
  // make prev and next pointers point to each other
  let prev = node.prev,
    next = node.next;
  prev.next = next;
  next.prev = prev;
};

LRUCache.prototype.insert = function (node) {
  // set pointers to and from previous most recent
  this.tail.prev.next = node;
  node.prev = this.tail.prev;
  // set pointers to and from cache tail
  node.next = this.tail;
  this.tail.prev = node;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    // when key is looked up, it needs to be moved to end of cache (tail.prev)
    // 1. look up
    let currentNode = this.cache.get(key);
    // 2. remove
    this.remove(currentNode);
    // 3. insert at end
    this.insert(currentNode);
    return currentNode.val;
  }
  // key not found
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // when a key is updated, move it to end of cache
  if (this.cache.has(key)) {
    // 1. look up and update value
    let currentNode = this.cache.get(key);
    currentNode.val = value;
    // 2. remove
    this.remove(currentNode);
    // 3. insert
    this.insert(currentNode);
  } else {
    // key doesn't exist, create new node
    let node = new Node(key, value);
    // store node with key for lookup
    this.cache.set(key, node);
    // insert
    this.insert(node);
  }

  // remove node when cache size > capacity
  if (this.cache.size > this.capacity) {
    // LRU node is head.next
    let firstNode = this.head.next;
    // remove node
    this.remove(firstNode);
    // remove key
    this.cache.delete(firstNode.key);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

/*
Time: O(1)
Space: O(1)
*/

// ES6 Map Implementation - iteration through Map happens in insertion order

// const LRUCache = function (capacity) {
//   this.cache = new Map();
//   this.capacity = capacity;
// };

// /**
//  * @param {number} key
//  * @return {number}
//  */

// LRUCache.prototype.get = function (key) {
//   if (!this.cache.has(key)) return -1;

//   const v = this.cache.get(key);
//   this.cache.delete(key);
//   this.cache.set(key, v);
//   return this.cache.get(key);
// };

// /**
//  * @param {number} key
//  * @param {number} value
//  * @return {void}
//  */

// LRUCache.prototype.put = function (key, value) {
//   if (this.cache.has(key)) {
//     this.cache.delete(key);
//   }

//   this.cache.set(key, value);
//   if (this.cache.size > this.capacity) {
//     // keys().next().value returns first item's key
//     this.cache.delete(this.cache.keys().next().value);
//   }
// };
