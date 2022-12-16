// https://leetcode.com/problems/design-twitter/solutions/1154945/javascript-hashmap-hashset-array-sort-based-on-timestamp-76ms-91-09/?orderBy=most_votes&languageTags=javascript

var Twitter = function () {
  this.userMap = new Map(); // {userId: [[tweetId, timestamp]]}
  this.followerMap = new Map(); // {followerId: Set[followeeId, followeeId, ...]}
  this.time = 0;
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
  // increment time for every new tweet
  this.time++;
  // create new user
  if (!this.userMap.has(userId)) this.userMap.set(userId, []);
  // push tweet and timestamp to userId array
  this.userMap.get(userId).push([tweetId, this.time]);
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  let res = this.userMap.get(userId) || []; // get user tweets
  let followees = this.followerMap.get(userId) || new Set(); // get user's followees

  // combine all of user tweets and followee tweets
  for (const user of followees) {
    res = res.concat(this.userMap.get(user) || []);
  }
  // sort by time in descending order
  res.sort((a, b) => b[1] - a[1]);
  // get first 10 most recent tweets and map to array of just tweetIds
  return res.slice(0, 10).map((tweet) => tweet[0]);
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  // add follower to followerMap
  if (!this.followerMap.has(followerId))
    this.followerMap.set(followerId, new Set());
  // add followee id to followerId's set
  this.followerMap.get(followerId).add(followeeId);
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  // if followerId in followerMap, delete followeeId
  if (this.followerMap.has(followerId))
    this.followerMap.get(followerId).delete(followeeId);
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
