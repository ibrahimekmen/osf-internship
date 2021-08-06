var profile = require('./profile');

function homeRoute(req,res){
    if(req.url === "/"){
        res.writeHead(200,{'Content-Type': 'text/plain'});
        res.write("Header\n");
        res.write("Search\n");
        res.end("Footer\n");
    }

}

function userRoute(req,res){
    let username = req.url.replace("/","");
    if(username.length > 0){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("Header\n");
        let studentProfile = new profile(username);

        

        studentProfile.on("end", function(profileJSON){
            
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }

            res.write(values.username + " has " + values.badges + " badges\n");
            res.end("footer");
        });

        studentProfile.on("error", error =>{
            console.log(error.message);
            res.end("footer");
        });
    }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;