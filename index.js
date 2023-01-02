// Create a file called tweets.js and change the varaible name from `window.YTD.tweets.part0 = [` to `const tweets = [`
// Then add `exports.tweets = tweets;` at the end of your file

const tweets = require('./tweets');
const path = require('path');

const csvWriter = require('csv-writer');

tweets.tweets.forEach((obj) => {
  const { tweet } = obj;
  if (!tweet.in_reply_to_screen_name) {
    console.log(tweet.full_text);
  }
});

const tweets_final = tweets.tweets
  .filter((t) => {
    if (
      t.tweet.in_reply_to_screen_name ||
      t.tweet.full_text.startsWith('RT', 0) ||
      t.tweet.full_text.startsWith('@', 0)
    ) {
      return false;
    }
    return true;
  })
  .map((t) => ({ tweet: t.tweet.full_text, date: t.tweet.created_at }))
  .sort((a, b) => new Date(a.date) - new Date(b.date));
console.log(tweets_final.length);

const half = Math.ceil(list.length / 2);

const firstHalf = list.slice(0, half);
const secondHalf = list.slice(half);

const writer = csvWriter.createObjectCsvWriter({
  path: path.resolve(__dirname, 'tweets.csv'),
  header: [{ id: 'tweet', title: 'tweet' }],
});

writer.writeRecords(firsthalf).then(() => {
  console.log('Done!');
});
