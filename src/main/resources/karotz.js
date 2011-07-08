karotz = {}

karotz.connect = function(host, port){
    log("host: " + host);
    log("port: " + port);
    if(__CLIENT__.connect(host, port, 5000)){
        log("karotz connected");
    }
    else{
        log("karotz NOT CONNECTED");
    }
}

karotz.start = function(callback, data){
    if(__CLIENT__.startInteractiveMode()){
        log("karotz interactive mode");
        callback(data);
    }
}

//////////////////////
__GEN_VOOS_CALLBACK = function(callback){
    var voosCallback = null;
    if(callback){
        voosCallback = new net.violet.karotz.client.VoosCallBack() {
            onEvent: function(voosMsg){callback(voosMsg.getEvent().getCode().toString())}
        };
    }
    return voosCallback;
}

karotz.tts = {}
karotz.tts.start = function(text, lang, callback){
    log("karotz should say ["+ lang +"]: " + text);
    __CLIENT__.sendTts(text, lang, __GEN_VOOS_CALLBACK(callback));
}

karotz.tts.stop = function(callback){
    throw "NOT IMPLEMENTED"
}

//////
karotz.led = {}
karotz.led.light = function(color){
    log("karotz led is: " + color);
    __CLIENT__.sendLed(color);
}

karotz.led.fade = function(color, duration, callback){
    log("karotz led fade: " + color);
        __CLIENT__.sendLedFade(color, duration, __GEN_VOOS_CALLBACK(callback));
}

karotz.led.pulse = function(color, period, duration, callback){
    log("karotz led pulse: " + color);
    __CLIENT__.sendLedPulse(color, period, duration, __GEN_VOOS_CALLBACK(callback));
}

//////
karotz.ears = {}
karotz.ears.move = function(left, right, callback){
    log("karotz ears move: [" + left + "," + right + "]");
    __CLIENT__.sendEarsMove(left, right, __GEN_VOOS_CALLBACK(callback));
}
karotz.ears.moveRelative = function(left, right, callback){
    log("karotz ears moveRelative: [" + left + "," + right + "]");
    __CLIENT__.sendEarsMoveRelative(left, right, __GEN_VOOS_CALLBACK(callback));
}
karotz.ears.reset = function(callback){
    log("karotz ears reset");
    __CLIENT__.sendEarsReset(__GEN_VOOS_CALLBACK(callback));
}
//////
karotz.webcam = {}
karotz.webcam.photo = function(url){
    log("karotz webcam photo: " + url);
    __CLIENT__.sendPhoto(url);
}

//////
karotz.multimedia = {}
karotz.multimedia.play = function( path, callback){
    log("karotz multimedia play: " + path);
    __CLIENT__.sendMultimediaPlay(path, __GEN_VOOS_CALLBACK(callback));
}
karotz.multimedia.pause = function(callback){
    log("karotz multimedia pause");
    __CLIENT__.sendMultimediaPause(__GEN_VOOS_CALLBACK(callback));
}
karotz.multimedia.resume = function(callback){
    log("karotz multimedia resume");
    __CLIENT__.sendMultimediaResume(__GEN_VOOS_CALLBACK(callback));
}
karotz.multimedia.stop = function(callback){
    log("karotz multimedia stop");
    __CLIENT__.sendMultimediaStop(__GEN_VOOS_CALLBACK(callback));
}
karotz.multimedia.next = function(callback){
    log("karotz multimedia next");
    __CLIENT__.sendMultimediaNext(__GEN_VOOS_CALLBACK(callback));
}
karotz.multimedia.previous = function(callback){
    log("karotz multimedia previous");
    __CLIENT__.sendMultimediaPrevious(__GEN_VOOS_CALLBACK(callback));
}

///////////
karotz.multimedia.artist = function(callback){
    log("karotz multimedia artist");
    var voosCallback = null;
    if(callback){
        voosCallback = new net.violet.karotz.client.VoosCallBack() {
            onEvent: function(voosMsg){
                callback(voosMsg.getMultimedia().getArtistlistList().get(0))
            }
        };
    }
    __CLIENT__.sendMultimediaArtist(voosCallback);
}
karotz.multimedia.folder = function(callback){
    log("karotz multimedia folder");
    var voosCallback = null;
    if(callback){
        voosCallback = new net.violet.karotz.client.VoosCallBack() {
            onEvent: function(voosMsg){
                callback(voosMsg.getMultimedia().getFolderlistList().get(0))
            }
        };
    }
    __CLIENT__.sendMultimediaFolder(voosCallback);
}
karotz.multimedia.genre = function(callback){
    log("karotz multimedia genre");
    var voosCallback = null;
    if(callback){
        voosCallback = new net.violet.karotz.client.VoosCallBack() {
            onEvent: function(voosMsg){
                callback(voosMsg.getMultimedia().getGenrelistList().get(0))
            }
        };
    }
    __CLIENT__.sendMultimediaGenre(voosCallback);
}
karotz.multimedia.song = function(callback){
    log("karotz multimedia song");
    var voosCallback = null;
    if(callback){
        voosCallback = new net.violet.karotz.client.VoosCallBack() {
            onEvent: function(voosMsg){
                callback(voosMsg.getMultimedia().getSonglistList().get(0))
            }
        };
    }
    __CLIENT__.sendMultimediaSong(voosCallback);
}
//////
karotz.asr = {}
karotz.asr.string= function(grammar, lang, callback){
    grammarList = new java.util.ArrayList();
    grammarList.add(grammar);

    var voosCallback = null;
    if(callback){
        voosCallback = new net.violet.karotz.client.VoosCallBack() {
            onEvent: function(voosMsg){
                if(!voosMsg.hasAsrCallback())
                    return;
                log("ASR reco: " + voosMsg.getAsrCallback().getRecognitionCount());
                var tmpResult = voosMsg.getAsrCallback().getRecognition(0);

                var asrResult = {
                    confident: tmpResult.getConfident(),
                    text: tmpResult.getText(),
                    semantic: tmpResult.getSemantic()
                };
                callback(asrResult);
            }
        };
    }

    __CLIENT__.sendAsr(grammarList, lang, voosCallback);
}



///////////////////////////
if(!karotz.rfid) karotz.rfid = {};
karotz.rfid.__LISTENERS = [];
karotz.rfid.addListener = function(callback){
    karotz.rfid.__LISTENERS.push(callback);
}

if(!karotz.button) karotz.button = {};
karotz.button.__LISTENERS = [];
karotz.button.addListener = function(callback){
    karotz.button.__LISTENERS.push(callback);
}

if(!karotz.ears) karotz.ears = {};
karotz.ears.__LISTENERS = [];
karotz.ears.addListener = function(callback){
    karotz.button.__LISTENERS.push(callback);
}

var msgHandler = new net.violet.karotz.client.MessageHandler() {
    onRfid:     function(rfidCallback){
        var data = {};
        data.id = rfidCallback.getId();
        if(rfidCallback.hasDirection()){data.direction = rfidCallback.getDirection().getNumber()}
        if(rfidCallback.hasApp()){data.app = rfidCallback.getApp();}
        if(rfidCallback.hasType()){ data.type = rfidCallback.getType().getNumber()}
        if(rfidCallback.hasPict()){ data.pict = rfidCallback.getPict()}
        if(rfidCallback.hasColor()){ data.color = rfidCallback.getColor().getNumber()}

        for(var i=0; i<karotz.rfid.__LISTENERS.length;i++ ){
            karotz.rfid.__LISTENERS[i](data)
        }
    },
    onEars:     function(earsCallback){
        for(var i=0; i<karotz.ears.__LISTENERS.length;i++ ){
            karotz.ears.__LISTENERS[i](earsCallback.getType().name())
        }
    },
    onButton:   function(buttonCallback){
        for(var i=0; i<karotz.button.__LISTENERS.length;i++ ){
            karotz.button.__LISTENERS[i](buttonCallback.getType().name())
        }
    },
    onMessade:  function(voosMsg){}
}

__CLIENT__.setMessageHandler(msgHandler);

karotz.multimedia.addListener =  function(callback){};