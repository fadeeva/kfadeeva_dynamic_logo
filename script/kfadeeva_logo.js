window.onload = function() { init(); }

var canvas = null;
var canvas_ctx = null;
var bufferCanvas = null;
var bufferCanvas_ctx = null;
var startCoordinates = [ [200, 130], [280, 185], [238, 260], [160, 260], [120, 185]];

function init() {
    canvas = document.getElementById("canvas");
    canvas_ctx = canvas.getContext("2d");
    
    /*
    bufferCanvas = document.createElement("canvas");
    bufferCanvas_ctx = bufferCanvas.getContext("2d");
    bufferCanvas_ctx.canvas.width = canvas_ctx.canvas.width;
    bufferCanvas_ctx.canvas.height = canvas_ctx.canvas.height;
    */
    
    /*
    canvas_ctx.fillStyle = "#c3a157";
    canvas_ctx.strokeStyle = "#c3a157";
    canvas_ctx.lineWidth = 2;
    */
    drawPentagon(startCoordinates);
    
    setInterval(animate, 30);
  
}

function drawCircle(x, y) {
    var radius = 9;
    canvas_ctx.fillStyle = "#c3a157";
    canvas_ctx.beginPath();
    canvas_ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    canvas_ctx.fill();
    
}

function drawLines(coordinates) {
    
    canvas_ctx.strokeStyle = "#c3a157";
    canvas_ctx.lineWidth = 2;
    
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
    canvas_ctx.fillStyle = "#222222";
    canvas_ctx.fillRect(0, 0, canvas_ctx.canvas.width, canvas_ctx.canvas.height);
    
    // outer circle border
    canvas_ctx.lineWidth = 1;
    canvas_ctx.strokeStyle = "#3a3a3a";
    canvas_ctx.beginPath();
    canvas_ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI, false);
    canvas_ctx.stroke();
    
    canvas_ctx.strokeRect(100, 100, 200, 200);
}

var direction = getDirection();
var i = 0;
function animate() {
    blank();
    
    if(direction[0] && direction[1]) {       
        startCoordinates[0][0]+=2, startCoordinates[0][1]+=2;       
    } else if(direction[0] || direction[1]) {       
        if(direction[0]) {         
            startCoordinates[0][0]+=2, startCoordinates[0][1]-=2;
        } else {
            startCoordinates[0][0]-=2, startCoordinates[0][1]+=2;
        }    
    } else if(!direction[0] && !direction[1]) {       
        startCoordinates[0][0]-=2, startCoordinates[0][1]-=2;
    }
    
    if(startCoordinates[0][0] > 300) {
        if(startCoordinates[0][1] < 100) {
            direction = [false, true];
        } else if(startCoordinates[0][1] > 300) {
            direction = [false, false];
        } else {
            direction[0] = false;
        }
    } else if(startCoordinates[0][0] < 100) {
        if(startCoordinates[0][1] < 100) {
            direction = [true, true];
        } else if(startCoordinates[0][1] > 300) {
            direction = [true, false];
        } else {
            direction[0] = true;
        }
    } else {
        if(startCoordinates[0][1] < 100) {
            direction = [true, true];
        } else if(startCoordinates[0][1] > 300) {
            direction = [true, false];
        }
    }

    i++;
    if(i > 50) {
        i = 0;
        direction = getDirection();
    }
    
    drawPentagon(startCoordinates);
}

function getDirection() {
    var randomInt = Math.floor(Math.random() * 101);
    if(randomInt > 0 && randomInt < 26) {
        return [true, true];
    } else if(randomInt > 25 && randomInt < 51) {
        return [true, false];
    } else if(randomInt > 50 && randomInt < 76) {
        return [false, true];
    } else if(randomInt > 75 && randomInt < 101) {
        return [false, false];
    } else {
        return [false, false];
    }
}

    
