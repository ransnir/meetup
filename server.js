var express = require('express'),
    app = express(),
    path = require('path'),
    request = require('request').defaults({proxy:'http://web-proxy.fc.hp.com:8080', agent:false});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var guestList = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getMeetup', function(req, res) {

    var getMeetup = "https://api.meetup.com/2/events?&sign=true&event_id=188436382&key=a813643237762e511a684d6129203c"



    request(getMeetup, function (error, response, body) {
        if (!error && response.statusCode == 200) {


            res.send(body);

        }
    });

});



app.get('/getGuests', function(req, res) {

    var getMeetupGuests = "https://api.meetup.com/2/rsvps?event_id=188436382&key=a813643237762e511a684d6129203c";



    request(getMeetupGuests, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            res.send(body);

        }
    });

});

var convertTobase64 = function() {

}



app.listen(555);

console.log('Listening on port 555...');




