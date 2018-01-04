const request = require('request');
const argv = require('yargs').argv;
const express = require('express');

const app = express()

let apiKey = '455126e42b27737586a08bcb5d5b007b';
let city = argv.c || 'houston';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

request(url, {json:true}, (err,res,body) => {
		if(err) throw err;	

	app.get('/', (req,res) => {
		res.send(`${body.main.temp}`)
	});
});

let port = 5000

app.listen(port, () => console.log('Port:'+ Port + 'Working'))