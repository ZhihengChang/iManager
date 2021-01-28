const http = require('http');
const config = require('../config/config.json');

http.createServer((request, response) => {
    //code
    console.log("server connected");
}).listen(config.service.port);




