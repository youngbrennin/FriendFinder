var friendList = require('../data/friends.js');

module.exports = function (app) {
    // get route to display friends in json format
    app.get('/api/friends', function (req, res) {
        res.json(friendList)
    });
    // add new data to the json route
    app.post('/api/friends', function (req, res) {
        var newFriendScores = req.body.scores;
        var scoresArray = [];
        var friendCount = 0;
        var bestMatch = 0;

        // searches the most updated list of potential friends
        for (var i = 0; i < friendList.length; i++) {
            var scoresDiff = 0;
            // comparing scores
            for (var j = 0; j < newFriendScores; j++) {
                scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
            }

            // adding the results to the scoresArray array
            scoresArray.push(scoresDiff);
        }

        // finding the best match
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        // best match response
        var bff = friendList[bestMatch];
        res.json(bff);

        // adding new data to friendList array
        friendList.push(req.body);
    });
};













