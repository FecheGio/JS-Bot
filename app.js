require('dotenv').config()

var twitter = require('twitter')
var tweetLogger = require('./logger')
var userAuth = require('./config').userAuth

/**
 *
 * Useful
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
bot.stream('statuses/filter', {track: '#sarasa'}, function(stream) {
  stream.on('data', function(tweet) {

    // muestra en consola el tweet que contenga dicha propiedad
    tweetLogger.in(tweet.text)

    // arreglo de objetos, cada objeto corresponde a una respuesta automatica
    // que respone a un numero aleatorio (botReply[i])
    
    var botReply = [{
      in_reply_to_status_id: tweet.id_str,
      status: `@${tweet.user.screen_name} esto es una respuesta automática 1`
    },
    {
      in_reply_to_status_id: tweet.id_str,
      status: `@${tweet.user.screen_name} esto es una respuesta automatica 2`
    },
    {
      in_reply_to_status_id: tweet.id_str,
      status: `@${tweet.user.screen_name} esto es una respuesta automatica 3`
    }]

    // publica la respuesta
    bot.post('statuses/update', botReply[(Math.floor(Math.random()*3))],  function(err, tweetReply){
      if (err) {
        console.error(err)
        return err
      }
      // muestra la respuesta que dimos
      tweetLogger.out(tweetReply.text)
    })
  })
})

//cuando usas este hashtag, además de quedar en ridículo, estás minimizando y invisibilizando la lucha de las mujeres, imbécil.
