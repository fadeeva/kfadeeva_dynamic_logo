window.onload = function() { init(); }

var theCanvas = null;
var ctx = null;
var startCoordinates = [ [200, 130], [280, 185], [238, 260], [160, 260], [120, 185]];

function init() {
    theCanvas = document.getElementById('canvas');
    
    if (theCanvas && theCanvas.getContext) {
        ctx = theCanvas.getContext("2d");
        ctx.fillStyle = "#c3a157";
        ctx.strokeStyle = "#c3a157";
        ctx.lineWidth = 2;
        
        drawPentagon(startCoordinates);
        
        // outer circle border
        radius = 100;
        x = theCanvas.width / 2;
        y = theCanvas.height / 2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#3a3a3a";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
    
}

function drawCircle(x, y) {
    var radius = 9;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    
}

function drawLines(coordinates) {
    ctx.beginPath();
    coordinates.forEach(function(xy, i, coordinates) {
        if(i) {
            ctx.lineTo(xy[0], xy[1]);
        } else {
            ctx.moveTo(xy[0], xy[1]);
        }
    })
    ctx.closePath();
    ctx.stroke();
}

function drawPentagon(coordinates) {
    coordinates.forEach(function(xy, i, coordinates) {
        drawCircle(xy[0], xy[1]);
    })
    drawLines(coordinates);
}


    
