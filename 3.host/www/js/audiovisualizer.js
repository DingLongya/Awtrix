var audioContext = null;
var audioSource = null;
var audioAnalyser = null;
var audioGain = null;
var audioData = null;
var volume = null;

window.onload = function() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    navigator.getUserMedia({
        audio: true,
        video: false
    }, audioSuccess, audioError);
};

function audioSuccess(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var fftSize = 256;

    audioContext = new AudioContext();
    audioSource = audioContext.createMediaStreamSource(stream);

    audioGain = audioContext.createGain();
    audioGain.gain.value = 1.0; //Lautstärke
    audioGain.connect(audioContext.destination);

    audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = fftSize;

    audioSource.connect(audioAnalyser);
    drawSpectrum(audioAnalyser);
}

function drawSpectrum(analyser) {
    var that = this,
        canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 10, //width of the meters in the spectrum
        gap = 2, //gap between meters
        capHeight = 2,
        capStyle = '#fff',
        meterNum = 88, //count of the meters
        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
    ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#f00');
    gradient.addColorStop(0.5, '#8000ff');
    gradient.addColorStop(0, '#0000ff');
    var drawMeter = function() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        if (that.status === 0) {

            //fix when some sounds end the value still not back to zero
            for (var i = array.length - 1; i >= 0; i--) {
                array[i] = 0;
            };

            allCapsReachBottom = true;
            for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
            };
            if (allCapsReachBottom) {
                cancelAnimationFrame(that.animationId); //since the sound is stoped and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
                return;
            };
        };
        var step = Math.round(array.length / meterNum); //sample limited data from the total array
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < (meterNum)) {
                capYPositionArray.push(map(value, 0, cheight, 0, 8));
            };
            ctx.fillStyle = capStyle;
            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = map(value, 0, cheight, 0, 8);
            };
            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
            ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
            //awtrix_raiseEvent("new_sound", { "x": i,"y":7,"w":1,"h":map(value,0,cheight,8,0) });
            capYPositionArray = capYPositionArray.map(Math.round);
            awtrix_raiseEvent("new_sound", { "x": capYPositionArray });
        }
        that.animationId = requestAnimationFrame(drawMeter);
    }
    this.animationId = requestAnimationFrame(drawMeter);
}

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var audioError = function(event) {

};