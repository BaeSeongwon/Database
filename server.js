/**
 * Created by Life on 2016-12-01.
 */
var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

http.createServer(app).listen('3000',function(){
    console.log('서버 실행 포트는 3000!!');
});

app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});