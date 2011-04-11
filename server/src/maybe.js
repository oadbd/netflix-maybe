var redis = require('redis');
    
var contentType = 'text/plain';    
    
var getKey = function (req) {
    return 'darryl';  
};

var respond = function (res, code, data) {
    var body = JSON.stringify(data || {});
    res.writeHead(code, {
        'Content-Length': body.length,
        'Content-Type': contentType
    });
    res.end(body);    
};

var connect = function (req, res) {
    var client = redis.createClient();
    client.on("error", function (err) {
        respond(res, 500, err);
    });
    return client;
};

var remind = exports.remind = function (req, res) {
    var client = connect(req, res);
    client.lrange(getKey(req), 0, -1, function (err, reply) {
        respond(res, err ? 500 : 200, err || reply);
    });
};
var remember = exports.remember = function (req, res) {
    var client = connect(req, res);
    client.rpush(getKey(req), req.body, function (err, reply) {
        respond(res, err ? 500 : 200, err || reply);
    });
};    

var forget = exports.forget = function (req, res) {
    respond(res, 200, {});    
};
