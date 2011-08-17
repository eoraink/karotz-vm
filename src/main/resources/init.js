uuid = function(){ return ___UTILS__.uuid() };

include = function(filename){ return ___UTILS__.include(filename) };

ping = function(){};

setTimeout = function(delay, f){ return ___UTILS__.setTimeout(delay, f) };

log = function(msg){ print(msg+"\n")};

exit = function(){ return ___UTILS__.exit() };

http = {}
http.post = function(url, params) {
    var javaparams = new java.util.HashMap();
    for( key in params ) {
        javaparams.put(key, params[key]);
    }
    return "" + __http.post(url, javaparams);
};

http.get = function(url) {
    return "" + __http.get(url);
}

http.get2 = function(url) {
    var temp = __http.get2(url);
    var res = {};
    res.header = "" + temp.get('header');
    res.content = "" + temp.get('content');
    return res;
}

http.post2 = function(url, params) {
    var javaparams = new java.util.HashMap();
    for( key in params ) {
        javaparams.put(key, params[key]);
    }
    var temp = __http.post2(url, javaparams);
    var res = {}
    res.header = "" + temp.get('header');
    res.content = "" + temp.get('content');
    return res;
}

timestamp = function() {
    return Math.floor(new Date().getTime()/1000);
}