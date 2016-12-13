
// npm install twitter
// API de twitter requerida

var TwitterPackage = require('twitter');

/*
      Useful
     Name: tweet.author.name
     Screen-name (@tweet.author.screen_name): tweet.author.screen_name
     Date UTC: tweet.created_at
     Tweet: tweet.text
     Retweeted: tweet.retweeted
     Favourited: tweet.favorited
*/

var userAuth = {
  consumer_key: 'put yours',
  consumer_secret: 'put yours',
  access_token_key: 'put yours',
  access_token_secret: 'put yours'
}

var Twitter = new TwitterPackage(userAuth);

// Stream tweets

Twitter.stream('statuses/filter', {track: '#sarasabot'}, function(stream) { //mostrará solo los tweets con la propiedad de "track:"
  stream.on('data', function(tweet) {

    console.log(tweet.text);              //muestra en consola el tweet que contenga dicha propiedad
    console.log('-------------');

    var botReply = {in_reply_to_status_id: tweet.id, status: "Hola @" + tweet.user.screen_name + " ."} //respuesta genérica, solo menciona, no responde

    //publica la respuesta
    Twitter.post('statuses/update', botReply,  function(error, tweetReply, response){

      // muestra la respuesta que dimos
      console.log(tweetReply.text);
    });

  });

});
