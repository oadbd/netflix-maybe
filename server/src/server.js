var http = require('http'),
    maybe = require('./maybe');

var cfg = {
    host: '0.0.0.0',
    port: process.env.PORT || process.env.C9_PORT || 8118
};

exports.run = function () {
    http.createServer(function (req, res) {
        if (req.method === 'GET') {
            maybe.remind(req, res);            
        } else if (req.method === 'POST') {
            maybe.remember(req, res);
        } else if (req.method === 'DELETE') {
            maybe.forget(req, res);
        }
    }).listen(cfg.port, cfg.host);
};
