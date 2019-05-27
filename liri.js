// ======================================================================
// LIRI is a command line node app that takes in parameters and gives you
// back data from Twitter, Spotify and OMDB movie databaseAPIs.
//  Author: Trish Mederos
//  UofA Full Stack Boot Camp Assignment week 10.

// ============= Declaring variables=================
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var fs = require('fs');
var client = new twitter( keys.twitter );
var spotify = new Spotify( keys.spotify);
var userInput;
var userData;


inquirer
  .prompt([
    // Display four options to the user.
    { type: "list",
      message: "Hello, this is LIRI - the Language Interpretation and Recognition Interface. \nPlease choose from the following: ",
      choices: [ "my-tweets",
                 "spotify-this-song",
                 "movie-this",
                 "do-what-it-says" ],
      name: "action"
    }
  ])
  .then(function(answers) {
    // console.log(JSON.stringify(answers, null, 2));
    //
    // Write the user's input to the log file.
    var inputData = formatUserInput( answers.action );
    logData( inputData, "User Input" );
    // Handles the input if user selects Tweets
    if ( answers.action === "my-tweets") {
      getTweets();
      }
  // ====== spotify-this-song is Selected ================
    else if ( answers.action === "spotify-this-song") {
    // Prompt user to type in song to lookup - 'The Sign' by Ace of Base set as
    // default if no song is entered.
    inquirer.prompt([{
             name: "song",
             type: "input",
             message: "What song should I look up?"
         }]).then(function(answer) {
             userInput = answer.song;
             if ( userInput !== "" ) {
               getSong( userInput );
             }
             else{
               getSong( 'The Sign Ace of Base' );
             }

            })
       }
    // ====== Movie-this is Selected ================
    else if ( answers.action === "movie-this") {
      // Prompt user to type in a movie to look up. Mr Nobody is entered as
      // a default if nothing is entered.
      inquirer.prompt([{
               name: "movie",
               type: "input",
               message: "What movie should I look up?"
           }]).then(function(answer) {
               userInput = answer.movie;
               if (userInput !== "") {
                   getMovie( userInput );
               }
               else {
                  getMovie( 'Mr Nobody' );
              }
          });
         }
    //
    // ====== do-what-it-says is Selected ================
    else if ( answers.action === "do-what-it-says") {
      // The random.txt file is used to look up a song on Spotify.
      getRandom();
    }
  });
//
// Tweet function ===========
function getTweets() {
    //
    client.get('statuses/user_timeline', { screen_name: 'BiteyBuffy', count: 10 }, function( error, twitterData ) {
      // console.log("Response: " + JSON.stringify(response, null, 2));
      // console.log("Tweets: " + JSON.stringify(tweets, null, 2));
        if ( !error ) {
          var tweetData = formatTweet( twitterData );
          console.log( tweetData );
          logData( tweetData, "Tweet" );
        }
    });
}
//
// === Spotify function =================================
function getSong( userInput ) {
  spotify.search({type: 'track',query: userInput,limit: 1 }, function( err, spotifyData ) {
      if ( err ) {
          console.log( "An error occurred: " + err );
      } else{
        var songData = formatSong( spotifyData );
        console.log( songData );
        logData( songData, "Song" );
      }
  });
};
//
// === getMovie function =================================
//
function getMovie( userInput) {
  var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&tomatoes=true&y=&plot=short&apikey=40e9cece";
  request( queryUrl, function( err, response, body ) {
    if ( !err && response.statusCode == 200 ) {
      var movieData = formatMovie( body );
      console.log( movieData );
      logData( movieData, "Movie" );
    } else {
        console.log( err );
        return;
      }
  });
  };
//
// === getRandom function ==============================
function getRandom(){
  fs.readFile( "random.txt", "utf8", function(error, data) {
      if (error) {
          console.log(error);
      }
      else {
        var dataRandom = data.split(",");
        switch( dataRandom[0] ){
          case 'spotify-this-song':
            getSong( dataRandom[1] );
            break;
          case 'movie-this':
            getMovie( dataRandom[1] );
            break;
          // tweets commented out because I haven't added ability to
          // get tweets other than BiteyBuffy
          // case 'my-tweets':
          //   getTweets( dataRandom[1] );
          //   break;
        }
      }
    });
  };
//
// === Song Format function ===================================
function formatSong( spotifyData ) {
  //
  var songPreview = spotifyData.tracks.items[0].preview_url;
  if ( !songPreview  ) {
    songPreview = "Not Available";
  };
  var returnString = "============================================" + "\n" +
                    "Artist: " + spotifyData.tracks.items[0].artists[0].name + "\n" +
                    "Song Title: " + spotifyData.tracks.items[0].name + "\n" +
                    "Album: " + spotifyData.tracks.items[0].album.name + "\n" +
                    "Song Preview: " + songPreview + "\n" +
                    "============================================";
    return returnString;
};
//
// === Format Tweet function =======================================
function formatTweet( twitterData ) {
  //
    var returnString = "";
    for ( var i = 0; i < twitterData.length; i++ ) {
      returnString += "============================================" + "\n" +
      " " + [ i + 1] + '. ' + twitterData[i].text + "\n" +
      'Tweeted on: ' + twitterData[i].created_at + "\n" +
      "============================================"  + "\n";
    }
    return returnString;
};
//
//=== Format Movie function ========================================
function formatMovie( MovieData ) {
  //
  var returnString = "============================================" + "\n" +
                    "Movie Search Information " + "\n" +
                    "Title: " + JSON.parse(MovieData)["Title"] + "\n" +
                    "Year Movie Released: " + JSON.parse(MovieData)["Released"] + "\n" +
                    "Country where the movie was produced: " + JSON.parse(MovieData)["Country"] + "\n" +
                    "Language of the movie: " + JSON.parse(MovieData)["Language"] + "\n" +
                    "IMDB Rating: " + JSON.parse(MovieData)["imdbRating"] + "\n" +
                    "Plot: " + JSON.parse(MovieData)["Plot"] + "\n" +
                    "Actors: " + JSON.parse(MovieData)["Actors"] + "\n" +
                    "Rotten Tomatoes Rating: " + JSON.parse(MovieData)["tomatoRating"] + "\n" +
                    "============================================" + "\n";
    return returnString;
};
//
//=== Format User Input ========================================
function formatUserInput( userInput ) {
  //
  var returnString = "============================================" + "\n" +
                    "User Input: " + userInput + "\n";
    return returnString;
};
//
// === This function will log the data to a log file ================
function logData( data, dataType ) {
    // today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: "2-digit", minute: "2-digit" };
    today = new Date().toLocaleDateString('en-US', options );
    console.log( "Date - " + today );
    fs.appendFile( "log.txt", today + " - " + dataType + "\n" + data + "\n" , function(err) {
        // If there is an error writing to the log file, console.log message.
        if ( err ) {
            console.log( err );
        }
    });
}
//
