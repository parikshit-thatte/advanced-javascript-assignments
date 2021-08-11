async function getData() {
    let url = "https://api.github.com/search/repositories?q=" + String(document.getElementById("userInput").value);

    fetch(url).then(res => res.json())
    .then((data)=>{
        processData(data)
        .then(result => {
            console.log(result);
        })
    });
}


const processData = async (data) => {
    let outputArray = [];
    for (let item of data.items) {
        let ownerObj = {
            login: item.owner.login
        };

        try {
                await fetch(item.owner.url).then(res => res.json()).then((data) => {
                ownerObj.name = data.name;
                });  
        } catch {
            ownerObj.name = "";
            continue;
        }

        try {
                await fetch(item.owner.followers_url).then(res => res.json()).then((data)=> {
                ownerObj.followersCount = data.length;
                });
        } catch {
            ownerObj.followersCount = 0;
            continue;
        }

        try {
                url = item.owner.following_url.split("{")[0];
                await fetch(url).then(res => res.json()).then((data) => {
                ownerObj.followingCount = data.length;
                });
        } catch {
            ownerObj.followingCount = 0;
            continue;
        }

        let numberOfBranches;
        try {
                url = item.branches_url.split("{")[0];
                await fetch(url).then(res => res.json()).then((data) => {
                numberOfBranches= data.length;
                });
        } catch {
            numberOfBranches = 0;
            continue;
        }

        outputArray.push({
            name: item.name,
            full_name: item.full_name,
            private: item.private,
            owner: ownerObj,
            licenseName: item.license,
            score: item.score,
            numberOfBranch: numberOfBranches
        });
    }

    return outputArray;
}
