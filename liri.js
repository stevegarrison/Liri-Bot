
require("dotenv").config();
// requires these from npm
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

// request required to get data from API's
var request = require("request");
var userInput = process.argv[2];
var nodeObj = process.argv;

var artist = "";
var song2 = "";
var songs = "";
var movies = "";
// if statements to direct to functions if typed
if(userInput == "concert-this")
{
    concert();
}
else if(userInput == "spotify-this-song")
{ 
    song();
}
else if(userInput == "movie-this")
{
    movie();
}
else if(userInput == "do-what-it-says")
{
   doWhat();
}
else 
{
    console.log(" ");
}

function concert()
{
for(var i=3;i<nodeObj.length;i++)
{
    if(i>3 && i<nodeObj.length)
    {
        artist = artist + "+" + nodeObj[i];
    }
    else 
    {
        artist += nodeObj[i];
    }
}
// Bands in town API
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

console.log(" ");
request(queryUrl, function(error, response, body)
{
    if (error) {
        console.log(error);
      }
      console.log(response);

      console.log("Venue: " + JSON.parse(body)[0].venue.name);
      console.log("Location: " + JSON.parse(body)[0].venue.city, JSON.parse(body)[0].venue.country);
      var time = JSON.parse(body)[0].datetime; 
      console.log("Time: " + time);
})
}

function song()
{
    
    for(var i=3;i<nodeObj.length;i++)
    {
        if(i>3 && i<nodeObj.length)
        {
            songs = songs + "+" + nodeObj[i];
            
        }
        else 
        {
            songs += nodeObj[i];
        }
    }

    spotify.search({type:'track', query: songs}, function(error, data)
    {
        console.log(" ");
        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);

        if(data.tracks.items[0].preview_url === null)
        {
            console.log("No Preview Link but heres the album link: " + data.tracks.items[0].external_urls.spotify)
        }
        else 
        {
            console.log("Preview link: " + data.tracks.items[0].preview_url)
        }
        console.log("Name of album: " + data.tracks.items[0].album.name);
    })
}

function movie()
{
    for(var i = 3; i<nodeObj.length; i++)
    {
        if(i>3 && i<nodeObj.length)
        {
            movies = movies + "+" + nodeObj[i];
        }
        else
        {
            movies += nodeObj[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response,body)
    {
        if (error) {
            console.log(error);
          }
          console.log(" ");

        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Movie Made: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    })

}

function doWhat()
{

    fs.readFile("random.txt", "utf8", function(error, data)
    {
        if(error)
        {
            console.log(error);
        }

        var whole = data.split(',');
        var x = whole[0];
        var y = whole[1];

        var z = y.replace(/\"/g, "");
        for(var i=0;i<z.length;i++)
        {
             z = z.replace(" ", "+")
        }
        song2 = z;


        spotify.search({type:'track', query: song2}, function(error, data)
        {

            console.log(" ");
            console.log("Song Name: " + data.tracks.items[0].name);
            if(data.tracks.items[0].preview_url === null)
            {
                console.log("No Preview Link but heres the album link: " + data.tracks.items[0].external_urls.spotify)
            }
            else 
            {
                console.log("Preview link: " + data.tracks.items[0].preview_url)
            }
            console.log("Name of album: " + data.tracks.items[0].album.name);
        })
    })
}