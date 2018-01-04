const request = require('request');
// const argv = require('yargs').argv;
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()

let apiKey = '455126e42b27737586a08bcb5d5b007b';
// let city = argv.c || '';
let city = 'Houston';
let units = 'metric';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`

//Body-Parser MiddleWare
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars Middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

request(url, {json:true}, (err,res,body) => {
		if(err) throw err;	

	app.get('/', (req,res) => {
		res.render('index')
	});

	app.post('/', (req,response) => {
		if(city !== '') {
			request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${apiKey}&units=${units}`, {json:true}, (err,res,body) => {
		if(err) throw err;	
			response.render('index', {
				city: req.body.city,
				temp: body.main.temp,
				unit: units
			});
			console.log(body.main.temp);
		})
	}
	})
});

let port = 5000

app.listen(port, () => console.log('Port:'+ port + 'Working'))