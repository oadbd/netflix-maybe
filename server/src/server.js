var http = require('http'),
    maybe = require('./maybe');

var cfg = {
    host: 'localhost',
    port: 8080
};

http.createServer(function (req, res) {
    if (req.method === 'GET') {
        maybe.remind(req, res);            
    } else if (req.method === 'POST') {
        maybe.remember(req, res);
    } else if (req.method === 'DELETE') {
        maybe.forget(req, res);
    }
}).listen(cfg.port, cfg.host);

