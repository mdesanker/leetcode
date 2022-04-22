/**
 * @param {number} capacity
 */

const LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */

LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;

  const v = this.cache.get(key);
  this.cache.delete(key);
  this.cache.set(key, v);
  return this.cache.get(key);
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key);
  }

  this.cache.set(key, value);
  if (this.cache.size > this.capacity) {
    // keys().next().value returns first item's key
    this.cache.delete(this.cache.keys().next().value);
  }
};

/*
Time: O(1)
Space: O(1)
*/
