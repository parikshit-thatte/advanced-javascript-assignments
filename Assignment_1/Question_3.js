const fetch = require("node-fetch");

let url = "http://api.nobelprize.org/v1/prize.json"

fetch(url)
    .then(res => res.json())
    .then((data)=>{
        processData(data)
        .then(result => {
            console.log(result);
        })
});


const processData = async (data) => {
    let chemistryNobelWinners = []

    for (const item of data.prizes) {
        if(Number(item.year) >= 2000 && Number(item.year) <= 2019 && item.category === "chemistry") {
            for (const laureate of item.laureates) {
                chemistryNobelWinners.push(laureate.firstname + " " + laureate.surname);
            }
        }
    }

    return chemistryNobelWinners;
}