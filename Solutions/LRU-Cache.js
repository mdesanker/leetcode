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

// Time: O(1)
// Space: O(capacity)

/**
LRU cache stores key value pairs and has a certain capacity.
When an item is accessed, added, or updated, it becomes the most recently used item, so is moved to the beginning of the cache
When cache capacity is exceeded, the least recently used item (from end of cache) is removed

Implement with a doubly linked list because it will be easy to remove nodes from where ever they are located and insert them at end of list

First need to define a Node class
Each node needs a key, in addition to the usual value parameter - this is needed when deleting nodes from the cache
Because it's a doubly linked list, every node also needs a prev and next pointer

Initialize the LRU cache data structure
Cache is a map that will map keys to nodes in the DLL
It will also have a capacity associated with it
We will use dummy head and tail nodes to contain the DLL so we don't have to deal with edge case where we try to add or remove nodes from DLL end

Build two helper functions for  simplicity and add them to the LRU cache prototype so that all instances can access these methods
Remove: removes a node by setting its previous to point to its next and vice versa
Insert: inserts a node into the end of the DLL (right before the tail). We will be used for every value that is most recently used

Get function:
We are given a key and need to return the value of the node associated with this key
If this key does not exist in the cache, return -1
Getting a node, means we are using it, so it needs to be moved to the end of the DLL
Get node from cache and store in variable
Remove then insert node
Return node.val

Put function:
We will need different approaches if the key already exists in the cache and if it is a completely new key

Existing:
Get associated node and store in variable
Update node.val
Remove and insert node to update its position as it has just been accessed

New:
Create new node with key and value attributes
Set key pointing to new node in cache
Insert node at end of DLL

Check if cache is too large:
If cache has too many values after adding the newest value
Store LRU node in variable - node at this.head.next
Remove LRU node
Delete lru.key from cache

TC: O(1) put and get operations are O(1)
SC: O(capacity) the size of the cache and DLL is capped at capacity
 */
