# liri-node-app

The challenge was to use Node JS to create a LIRI bot, like iPhone's SIRI, but takes in commands from language instead of speech. LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns data based on one of four commands:

  * `my-tweets`

  * `spotify-this-song`

  * `movie-this`

  * `do-what-it-says`
  
  ---
# Screenshot
![Screenshot](https://github.com/tmederos/liri-node-app/blob/master/screen-shot1.jpg)

## What Each Command Does

1. `node liri.js my-tweets`

  * Displays my last 20 tweets and when they were created in terminal/bash window.
  
![Screenshot](https://github.com/tmederos/liri-node-app/blob/master/screen-shot.jpg)

2. `node liri.js spotify-this-song <song name>`

  * Shows the following information about the song in terminal/bash window.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to
    *"Florescent Adolescent" by Arctic Monkeys

3. `node liri.js movie-this <movie name>`

  * Shows the following information in terminal/bash.

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `node liri.js do-what-it-says`

  * Takes the text from random.txt and runs the song through spotify-this-song command
---
## Tech used
- Node.js
- Twitter NPM Package - https://www.npmjs.com/package/twitter
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request


Built With
* Sublime Text - Text Editor
* Visual Studio Code - Text Editor
