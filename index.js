// Create a file called tweets.js and change the varaible name from `window.YTD.tweets.part0 = [` to `const tweets = [`
// Then add `exports.tweets = tweets;` at the end of your file

const tweets = require('./tweets');
const path = require('path');

const csvWriter = require('csv-writer');

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

const writer = csvWriter.createObjectCsvWriter({
  path: path.resolve(__dirname, 'tweets.csv'),
  header: [{ id: 'tweet', title: 'tweet' }],
});

writer.writeRecords(tweets_final).then(() => {
  console.log('Done!');
});
console.log(tweets_final.length);
