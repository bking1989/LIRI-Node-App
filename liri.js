// Required modules
const fs = require("fs");
const axios = require("axios");
const Spotify = require("node-spotify-api");

// Dotenv configuration
require("dotenv").config();

// API keys
var keys = require("./keys.js");

var spotify = new Spotify ({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// Define our Node arguments
const [node, file, arg1, arg2, ...argv] = process.argv;

// Spotify Command
const spotifyFn = () => {
    if (process.argv[3] == null) {
        spotify.search({
            type: 'track',
            query: "The Sign AND Ace of Base"
        }, function(err,data) {
            if (err) {
                return console.log("Error occurred: " + err);
            };

            var artistName = data.tracks.items[0].artists[0].name;
            var songName = data.tracks.items[0].name;
            var preURL = data.tracks.items[0].preview_url;
            var albumName = data.tracks.items[0].album.name;

            console.log(`\nArtist(s): ${artistName}\nSong: ${songName}\nPreview: ${preURL}\nAlbum: ${albumName}`);

            var path = "./log.txt";

            if (!fs.existsSync(path)) {
                fs.writeFileSync("log.txt", `LIRI Entry Log begins here!\r\n-----\r\nArtist(s): ${artistName}\r\nSong: ${songName}\r\nPreview: ${preURL}\r\nAlbum: ${albumName}\r\n-----`, "utf8");
                console.log("\nLog file successfully created and updated!");
            } else {
                fs.appendFileSync(path, `\r\nArtist(s): ${artistName}\nSong: ${songName}\r\nPreview: ${preURL}\r\nAlbum: ${albumName}\r\n-----`);
                console.log("\nLog file successfully updated!");
            };
        });
    } else {
        var songName = process.argv[3];

        spotify.search({
                type: 'track',
                query: songName
            }, function(err,data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                };

                console.log(`\nHere are the top search results:\n-----`);

                for (var i = 0; i < 5; i++) {
                    var artistName = data.tracks.items[i].artists[0].name;
                    var songName = data.tracks.items[i].name;
                    var preURL = data.tracks.items[i].preview_url || "No Preview Available";
                    var albumName = data.tracks.items[i].album.name;

                    console.log(`\nArtist(s): ${artistName}\nSong: ${songName}\nPreview: ${preURL}\nAlbum: ${albumName}`);
                };

                var path = "./log.txt";

                if (!fs.existsSync(path)) {
                    fs.writeFileSync("log.txt", `LIRI Entry Log begins here!\r\n-----`, "utf8");

                    for (var i = 0; i < 5; i++) {
                        var artistName = data.tracks.items[i].artists[0].name;
                        var songName = data.tracks.items[i].name;
                        var preURL = data.tracks.items[i].preview_url || "No Preview Available";
                        var albumName = data.tracks.items[i].album.name;

                        fs.appendFileSync(path, `\r\nArtist(s): ${artistName}\r\nSong: ${songName}\r\nPreview: ${preURL}\r\nAlbum: ${albumName}\r\n`);
                    };

                    fs.appendFileSync(path, `\n-----`)
                    console.log("\nLog file successfully created and updated!");
                } else {
                    for (var i = 0; i < 5; i++) {
                        var artistName = data.tracks.items[i].artists[0].name;
                        var songName = data.tracks.items[i].name;
                        var preURL = data.tracks.items[i].preview_url || "No Preview Available";
                        var albumName = data.tracks.items[i].album.name;

                        fs.appendFileSync(path, `\r\nArtist(s): ${artistName}\r\nSong: ${songName}\r\nPreview: ${preURL}\r\nAlbum: ${albumName}\r\n`);
                    };

                    fs.appendFileSync(path, `\n-----`)
                    console.log("\nLog file successfully updated!");
                };
            });
        };
    };

// OMDB Command
const movieFn = () => {
    if (process.argv[3] == null) {
        console.log(`\nIf you haven't watched "Mr. Nobody", then you should: http://www.imdb.com/title/tt0485947/\nIt's on Netflix!`);

        var path = "./log.txt";

        if (!fs.existsSync(path)) {
            fs.writeFileSync("log.txt", `LIRI Entry Log begins here!\r\n-----\r\nIf you haven't watched "Mr. Nobody", then you should: http://www.imdb.com/title/tt0485947/\r\nIt's on Netflix!\r\n-----`, "utf8");
            console.log("\nLog file successfully created and updated!");
        } else {
            fs.appendFileSync(path, `\r\nIf you haven't watched "Mr. Nobody", then you should: http://www.imdb.com/title/tt0485947/\r\nIt's on Netflix!\r\n-----`);
            console.log("\nLog file successfully updated!");
        };
    } else {
        var movieName = process.argv[3].trim().toLowerCase().replace(" ","+");

        axios.get(`http://www.omdbapi.com/?t=${movieName}&apikey=${keys.omdb.api}`)
        .then(function (response) {
            var movieTitle = response.data.Title;
            var movieYear = response.data.Year;
            var imdbRating = response.data.Ratings[0].Value;
            var rtRating = response.data.Ratings[1].Value;
            var country = response.data.Country;
            var movieLang = response.data.Language;
            var moviePlot = response.data.Plot;
            var actors = response.data.Actors;

            console.log(`\nTitle: ${movieTitle}\nYear Released: ${movieYear}\nIMDb Rating: ${imdbRating}\nRotten Tomato Rating: ${rtRating}\nCountry: ${country}\nLanguage: ${movieLang}\nPlot: ${moviePlot}\nStarring: ${actors}`);

            var path = "./log.txt";

            if (!fs.existsSync(path)) {
                fs.writeFileSync("log.txt", `LIRI Entry Log begins here!\r\n-----\r\nTitle: ${movieTitle}\r\nYear Released: ${movieYear}\r\nIMDb Rating: ${imdbRating}\r\nRotten Tomato Rating: ${rtRating}\r\nCountry: ${country}\r\nLanguage: ${movieLang}\r\nPlot: ${moviePlot}\r\nStarring: ${actors}\r\n-----`, "utf8");
                console.log("\nLog file successfully created and updated!");
            } else {
                fs.appendFileSync(path, `\r\nTitle: ${movieTitle}\r\nYear Released: ${movieYear}\r\nIMDb Rating: ${imdbRating}\r\nRotten Tomato Rating: ${rtRating}\r\nCountry: ${country}\r\nLanguage: ${movieLang}\r\nPlot: ${moviePlot}\r\nStarring: ${actors}\r\n-----`);
                console.log("\nLog file successfully updated!");
            };
        });
    };
};

// Random.txt Command
const nativeFn = () => {
    var path = "./random.txt";

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error occurred: " + err);
            console.log(data);
        } else {
            var textArray = data.split(",");
            var arg1 = textArray[0];
            var arg2 = textArray[1];

            switch(arg1) {
                case "spotify-this-song":
                    process.argv[3] = arg2;
                    spotifyFn();
                    break;
                case "movie-this":
                    process.argv[3] = arg2;
                    movieFn();
                    break;
                case "do-what-it-says":
                    process.argv[3] = arg2;
                    nativeFn();
                    break;
                };
            };
        });
    };

// Switch for User Input
switch(process.argv[2]) {
    case "spotify-this-song":
        spotifyFn();
        break;
    case "movie-this":
        movieFn();
        break;
    case "do-what-it-says":
        nativeFn();
        break;
};