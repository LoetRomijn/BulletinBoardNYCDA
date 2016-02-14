var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var connectionString = "postgress://loet@localhost/bulletinboard"
pg.connect(connectionString, function(err, client, done) {
	if (err) {
		done();
		throw err;
	}
	client.query('insert into messages (name, title, messages) values (\'name\', \'title\', \'message\')', [request.body.name, request.body.title, request.body.message], function(err, result) {
		console.log(result.rows);
		done();
		pg.end(); // the client will idle for another 30 seconds, temporarily preventing the app from closing, unless this function is called
	});
});