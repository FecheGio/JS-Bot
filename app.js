require('dotenv').config()

var twitter = require('twitter')
var tweetLogger = require('./logger')
var userAuth = require('./config').userAuth

/**
 * Useful
 *
 * Name: tweet.author.name
 * Screen-name (@tweet.author.screen_name): tweet.author.screen_name
 * Date (UTC): tweet.created_at
 * Tweet: tweet.text
 * Retweeted: tweet.retweeted
 * Favourited: tweet.favorited
*/


var bot = new twitter(userAuth)

// Stream tweets
// mostrará solo los tweets con la propiedad de 'track:'
bot.stream('statuses/filter', {track: '#sarasabot'}, function(stream) {
  stream.on('data', function(tweet) {g

    // muestra en consola el tweet que contenga dicha propiedad
    tweetLogger.in(tweet.text)

    // respuesta genérica, solo menciona, no responde
    var botReply = {
      in_reply_to_status_id: tweet.id,
      status: `Hola @${tweet.user.screen_name} .`
    }

    // publica la respuesta
    bot.post('statuses/update', botReply,  function(err, tweetReply){
      if (err) {
        console.error(err)
        return err
      }
      // muestra la respuesta que dimos
      tweetLogger.out(tweetReply.text)
    })
  })
})
