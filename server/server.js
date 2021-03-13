const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

// create a express application
const app = express();

// initialize pusher
let pusher = new Pusher({
    appId: '1170129',
    key: 'c5a485ae6a7778db308b',
    secret: 'ff2fb273caf1bd8afb27',
    cluster: 'mt1'
    // encrypted: true
});

const shortNotes = [
	{ id: 0, date: "2021-03-07", username: "User1", location: {lat: 10.11111, lng: -12.11111 }, note: "Location 1" },
	{ id: 1, date: "2021-03-07", username: "User2", location: {lat: 9.11111, lng: -10.11111 }, note: "Location 2" },
	{ id: 2, date: "2021-03-08", username: "User3", location: {lat: 8.61111, lng: -8.11111 }, note: "Location 3" },
	{ id: 3, date: "2021-03-08", username: "User4", location: {lat: 8.11111, lng: -6.11111 }, note: "Location 4" },
	{ id: 4, date: "2021-03-08", username: "User5", location: {lat: 7.61111, lng: -4.11111 }, note: "Location 5" }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.post('/pusher/auth', (req, res) => {
  let socketId = req.body.socket_id;
  let channel = req.body.channel_name;
  let random_string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  let presenceData = {
      user_id: random_string,
      user_info: {
          username: '@' + random_string,
      }
  };
  let auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

app.post('/update-location', (req, res) => {
  // trigger a new post event via pusher
  pusher.trigger('presence-channel', 'location-update', {
      'username': req.body.username,
      'location': req.body.location
  })

  res.json({ 
		status: 200 
	});

});

// display all short notes. Hardcoded to display some, no database connected.
app.post('/all-short-notes', (req, res) => {

	return res.json({
    success: true,
		data: shortNotes
	});

});

// add a short note to the current location
app.post('/add-short-note', (req, res) => {

	let id = shortNotes.length + 1;
	let username = req.body.username;
	let location = req.body.location;
	let note = req.body.note;

	shortNotes.push({
		id: id,
		username: username,
		location: location,
		note: note
	});

	return res.json({ 
		status: 200,
		data: shortNotes
	});
	
});

let port = 3128;
app.listen(port);
console.log('Backend started on port ' + port + "...");