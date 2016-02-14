// Create a website that allows people to post messages to a page. A message consists of a title and a body.
// The site should have two pages:
// - The first page shows people a form where they can add a new message.
// - The second page shows each of the messages people have posted.
// Make sure there's a way to navigate the site so users can access each page.

// Messages must be stored in a postgres database. Create a "messages" table with three columns:
// column name / column data type:
// - id: serial primary key
// - title: text
// - body: text


var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = "postgres://" + process.env.POSTGRES_USER + ":@localhost/bulletinboard";

// "postgres://" + process.env.POSTGRES_USER + ":@localhost/bulletinboard" > how to pass the env. parameter 'loet'?


var app = express();

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'jade');


app.get('/', function(request, response) {
	response.render('index');
});


app.post('/create', function(request, response) {
	queryString = 'insert into messages (title, body) values (' + '\'' + request.body.title + '\',\'' + request.body.body + '\'' + ');';

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			throw err;
		}
		client.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			console.log(result.rows);

			done();
			pg.end();
		});
		response.redirect('/messages');
	});
});

app.get('/messages', function(request, response) {
	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			throw err;
		}
		client.query('select * from messages', function(err, result) {
			console.log(result.rows);
			messages = result.rows.reverse();
			response.render('messages', {
				messages: messages
			});
			done();
			pg.end();
		});
	});
});


app.listen(3000);
console.log('BulletinBoardApp running on port 3000');



