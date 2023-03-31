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

// Time: O(1) checking if user exists in userMap is O(1) lookup, pushing new tweet onto array is O(1) operation
// Space: O(n) linear space needed for every tweet post

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

// Time: O(nlogn) sorting the tweets by timestamp is nlogn operation using built-in sort, all other operations are max linear complexity
// Space: O(n) we need memory to build the array of tweets

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

// Time: O(1) lookup time and addition to sets is O(1) time complexity
// Space: O(n) every time we add a unique followee, we have to add space to the set

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

// Time: O(1) deletion from set is O(1)
// Space: O(n) for size of set

/**
Initialize:
We will need to keep track of users and their tweets and users and the people they are following
This can be done with two Maps
User map will mape userId to an array of arrays containing tweetIds and their corresponding timestamps
userMap: {userId: [[tweetId, timestamp]]}
Follower map will map followerId (userIds) to a set of followeeIds (to prevent duplicate followes)
followerMap: {followerId: Set[followeeId]}

We also need to initialize a timer, so we can add a timestamp to every tweet to allow sorting by most recent

Get News Feed:
We need to get the tweets for the user, combine them with tweets from all their followers, sort them with more recent tweets at the beginning,
then return the first 10 tweets if there are mroe than 10

First we pull the users tweets from the userMap using a get operation 
Then we get the list of people the user follows from the follower map 
Then we need to get the tweets for every followee from userMap and add them to the user tweets array

Now we can sort the array of combined tweets by timestamp in descending order

Then we slice the first 10 tweets, and return just the tweet using a map function

TC: O(nlogn) sorting the combined tweets in descending time order
SC: O(n) linear space is required to build the combined tweets array

Follow:
Check if followerId already exists in followerMap, if not, map it to an empty set
Add followeeId to the followerId's set

TC: O(1) lookup and add operations in a set are constant time
SC: O(n) space complexity for a set is the size of the set

Unfollow:
If followerId exists in followerSet, delete the followeeId

TC: O(1) deletion operations in a set are constant time
SC: O(n) space complexity is the size of the set? does this apply to deletions?
 */
