const http = require('http');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;

const hostname = '127.0.0.1';
const port = 5000;
const build = 'fn main(){ gear_wasm_builder::build(); }';

const server = express();

server.use(bodyParser.urlencoded({
	extended:true
}));

server.post("/", function(req, res){
	var rs = JSON.parse(req.body.fieldRS);
    var toml = JSON.parse(req.body.fieldTOML);
    fs.writeFile("./first-gear-app/src/lib.rs", rs, 'utf8', function(err){
        if (err) return console.log(err);
    });
    fs.writeFile("./first-gear-app/Cargo.toml", toml, 'utf8', function(err){
        if (err) return console.log(err);
    });
    fs.writeFile("./first-gear-app/build.rs", build, 'utf8', function(err){
        if (err) return console.log(err);
    });
    exec('~/cargo build --release', function (error, stdout, stderr) {
        if (error !== null) {
          console.log(error);
        } else {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        }
    }); 
});

server.listen(port, () => {
	console.log(hostname.toString() + ' ' + port.toString());
    exec('~/rustup toolchain add nightly', function (error, stdout, stderr) {
        if (error !== null) {
          console.log(error);
        } else {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        }
    });
    exec('~/rustup target add wasm32-unknown-unknown --toolchain nightly', function (error, stdout, stderr) {
        if (error !== null) {
          console.log(error);
        } else {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        }
    });
    exec('~/cargo new first-gear-app --lib', function (error, stdout, stderr) {
        if (error !== null) {
          console.log(error);
        } else {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        }
    });
    console.log("Success!");
});