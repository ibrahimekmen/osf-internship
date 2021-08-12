const https = require('https');
const username = "chalkers";

function printMessage(name,badgeCount,point){
    const message = `${name} has ${badgeCount} total badges and ${point} points in js`;
    console.log(message);
}

function getProfile(username){
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
        console.dir(res.statusCode); 
        
        let dataString = "";
        res.on('data', data =>{
            dataString += data.toString();
        });

        res.on("end", ()=>{
            const jsonData = JSON.parse(dataString);
            printMessage(username,jsonData.badges.length,jsonData.points.JavaScript);
        });

    });

    request.on('error', error =>{
        console.log(error.message);
    });
}

const users = process.argv.slice(2);
console.log(users);
users.forEach(getProfile);