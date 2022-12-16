const http = require('http');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const hostname = '127.0.0.1';
const port = 5000;

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) };

const server = express();
server.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

server.post("/", express.json(), function (req, res, next) {
	console.log(req.body);
	//res.send(req.body);
	var rs = req.body[0];
	var toml = req.body[1];
	fs.writeFile('./first-gear-app/src/lib.rs', rs, err => {
		if (err) {
			console.error(err);
		}
		console.log("rs replaced");
	});
	fs.writeFile('./first-gear-app/Cargo.toml', toml, err => {
		if (err) {
			console.error(err);
		}
		console.log("toml replaced");
	});
	const dir = `cd first-gear-app & cargo build --release`
	exec(dir, function (error, stdout, stderr) {
		if (error !== null) {
			console.log(error);
		}
		else {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
		}
	});


	const code = fs.readFileSync('./first-gear-app/target/wasm32-unknown-unknown/demo_ping.opt.wasm');
	gearApi.code.upload(code);

});

server.listen(port, () => {
	console.log(hostname.toString() + ' ' + port.toString());
});