var callback = function(data){
    log("connected: "+data);
//    exit();
}
var socialok = function(data){
    log("connected to Karotz");
    setTimeout(100, function(){karotz.start(callback, {});return false});
    var sign = social.twitter.sign('blabla');
    log("social.twitter.sendSign sign: " + sign.toString());
//karotz.led.light("FF0000");
}

karotz.connect("192.168.90.5", 9123);
social.init(socialok, {});

//var sign = "sign";



//karotz.button.addListener(function(event){ log(event) });

//