const fetch = require("node-fetch");

let url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json"

fetch(url)
    .then(res => res.json())
    .then((data)=>{
        processData(data)
        .then(result => {
            console.log(result);
        })
});


const processData = async (data) => {
    
    let actorList = [];
    let actors = {};

    let genreList = [];
    let genres = {};

    for (const item of data) {

        item.cast.forEach(actor => {
            if(actorList.includes(actor)){
                actors[actor].push(item.title);
            } else {
                actorList.push(actor);
                actors[actor] = new Array(item.title);
            }
        });

        item.genres.forEach(genre => {
            if(genreList.includes(genre)){
                genres[genre].push(item.title);
            } else {
                genreList.push(genre);
                genres[genre] = new Array(item.title);
            }
        });
    }

    let finalObj = {
        actors: [],
        genres: []
    }

    for (const actor in actors) {
        let obj = {
            Name: actor,
            Movies: actors[actor]
        }
        finalObj.actors.push(obj)
    }

    for (const genre in genres) {
        let obj = {
            Type: genre,
            Movies: genres[genre]
        }
        finalObj.genres.push(obj)
    }

    return finalObj;
}