window.onload = function() { init(); }

var canvas = null;
var canvas_ctx = null;
var bufferCanvas = null;
var bufferCanvas_ctx = null;
var startCoordinates = [ [200, 130], [280, 185], [238, 260], [160, 260], [120, 185]];

function init() {
    canvas = document.getElementById("canvas");
    canvas_ctx = canvas.getContext("2d");
    
    bufferCanvas = document.createElement("canvas");
    bufferCanvas_ctx = bufferCanvas.getContext("2d");
    bufferCanvas_ctx.canvas.width = canvas_ctx.canvas.width;
    bufferCanvas_ctx.canvas.height = canvas_ctx.canvas.height;
    
    canvas_ctx.fillStyle = "#c3a157";
    canvas_ctx.strokeStyle = "#c3a157";
    canvas_ctx.lineWidth = 2;

    drawPentagon(startCoordinates);
    
    setInterval(animate, 30);
    
    // outer circle border
    radius = 100;
    x = canvas.width / 2;
    y = canvas.height / 2;
    canvas_ctx.lineWidth = 1;
    canvas_ctx.strokeStyle = "#3a3a3a";
    canvas_ctx.beginPath();
    canvas_ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    canvas_ctx.stroke();    
}

function drawCircle(x, y) {
    var radius = 9;
    canvas_ctx.beginPath();
    canvas_ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    canvas_ctx.fill();
    
}

function drawLines(coordinates) {
    canvas_ctx.beginPath();
    coordinates.forEach(function(xy, i, coordinates) {
        if(i) {
            canvas_ctx.lineTo(xy[0], xy[1]);
        } else {
            canvas_ctx.moveTo(xy[0], xy[1]);
        }
    })
    canvas_ctx.closePath();
    canvas_ctx.stroke();
}

function drawPentagon(coordinates) {
    coordinates.forEach(function(xy, i, coordinates) {
        drawCircle(xy[0], xy[1]);
    })
    drawLines(coordinates);
}

function blank() {
    bufferCanvas_ctx.fillRect(0, 0, bufferCanvas_ctx.canvas.width, bufferCanvas_ctx.canvas.height);
}

function animate() {
    blank();
}

    
