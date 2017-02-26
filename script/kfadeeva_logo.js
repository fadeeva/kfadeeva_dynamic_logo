window.onload = function() { init(); }

var canvas = null;
var canvas_ctx = null;
var bufferCanvas = null;
var bufferCanvas_ctx = null;
var startCoordinates = [ [200, 130], [280, 185], [238, 260], [160, 260], [120, 185] ];
var left = false, right = true;
var j = 0;
var direction = [];
direction = rebuildDirection();

function init() {
    canvas = document.getElementById("canvas");
    canvas_ctx = canvas.getContext("2d");
    
    /*
    bufferCanvas = document.createElement("canvas");
    bufferCanvas_ctx = bufferCanvas.getContext("2d");
    bufferCanvas_ctx.canvas.width = canvas_ctx.canvas.width;
    bufferCanvas_ctx.canvas.height = canvas_ctx.canvas.height;
    */

    drawPentagon(startCoordinates);
    //drawGuideLines();
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
    canvas_ctx.fillStyle = "#222";
    canvas_ctx.fillRect(0, 0, canvas_ctx.canvas.width, canvas_ctx.canvas.height);
       
    drawGuideLines();
}

function drawGuideLines() {   
    // outer circle border
    canvas_ctx.lineWidth = 1;
    canvas_ctx.strokeStyle = "#3a3a3a";
    canvas_ctx.beginPath();
    canvas_ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI, false);
    canvas_ctx.stroke();

    // outer rectangle border
    canvas_ctx.strokeRect(100, 100, 200, 200);
    
    /*/ inner rectangle border
    canvas_ctx.strokeRect(150, 150, 100, 100);
    
    // inner circle border
    canvas_ctx.beginPath();
    canvas_ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI, false);
    canvas_ctx.stroke();
    */
    
    // dividing line
    canvas_ctx.strokeStyle = "#3a3a3a";
    canvas_ctx.beginPath();
    canvas_ctx.moveTo(100, canvas.height / 2);
    canvas_ctx.lineTo(300, canvas.height / 2);
    canvas_ctx.stroke();
}

function animate() {
    blank();
    
    movePentagon(startCoordinates[0], 0);
    movePentagon(startCoordinates[1], 1);
    movePentagon(startCoordinates[2], 2);
    movePentagon(startCoordinates[3], 3);
    movePentagon(startCoordinates[4], 4);

    drawPentagon(startCoordinates);    
}

function rebuildDirection() {
    for(var i = 0; i < 5; i++) {
        direction[i] = getDirection();
    }
    return direction;
}

function movePentagon(circle, num) {
    if(direction[num][0] && direction[num][1]) {       
        circle[0]+=2, circle[1]+=2;       
    } else if(direction[num][0] || direction[num][1]) {       
        if(direction[num][0]) {         
            circle[0]+=2, circle[1]-=2;
        } else {
            circle[0]-=2, circle[1]+=2;
        }    
    } else if(!direction[num][0] && !direction[num][1]) {       
        circle[0]-=2, circle[1]-=2;
    }
    
    if(circle[0] > 300) {
        if(circle[1] < 100) {
            direction[num] = [left, right];
        } else if(circle[1] > 300) {
            direction[num] = [left, left];
        } else {
            direction[num][0] = left;
        }
    } else if(circle[0] < 100) {
        if(circle[1] < 100) {
            direction[num] = [right, right];
        } else if(circle[1] > 300) {
            direction[num] = [right, left];
        } else {
            direction[num][0] = right;
        }
    } else {
        if(circle[1] < 100) {
            direction[num] = [right, right];
        } else if(circle[1] > 300) {
            direction[num] = [right, left];
        }
    }
    
    if(j >= 500) {
        rebuildDirection();
        j = 0;
    } else {
        j++;
    }
}

function getDirection() {
    var randomInt = Math.floor(Math.random() * 101);
    if(randomInt > 0 && randomInt < 26) {
        return [right, right];
    } else if(randomInt > 25 && randomInt < 51) {
        return [right, left];
    } else if(randomInt > 50 && randomInt < 76) {
        return [left, right];
    } else if(randomInt > 75 && randomInt < 101) {
        return [left, left];
    } else {
        return [left, left];
    }
}

    
