let kfadeevaLogoSettings = {
    size     : 240, // высота f 234px, поэтому пока подгоняю под 240px
    circles  : { radius : 9, color: "#c3a157" },
    pentagon : { lineWidth: 2, color: "#c3a157"},
    letter   : { color: "#161616" }
}

window.onload = function() { kfadeevaLogo(kfadeevaLogoSettings); }

function kfadeevaLogo(stn) {
    let logoCnt = document.getElementById("fadeeva_logo_container");    
    logoCnt.innerHTML = "<canvas id='fadeeva_logo_canvas' width="+ stn.size +" height="+ stn.size +"></canvas>"
    
    init();
}

let canvas = null;
let canvas_ctx = null;
let bufferCanvas = null;
let bufferCanvas_ctx = null;
let upF = null, bottomF = null;
//const startCoordinates = [ [120, 185], [200, 130], [280, 185], [238, 260], [160, 260] ];
const startCoordinates = [ [22, 100], [120, 20], [218, 100], [180, 200], [60, 200] ];
const left = false, right = true;
let j = 0;
let direction = [];
let quater = {};
let rect = {
    quater_1 : { x_min : 100, x_max : 200, y_min : 100, y_max : 180 }, 
    quater_2 : { x_min : 200, x_max : 300, y_min : 100, y_max : 180 },  
    quater_3 : { x_min : 240, x_max : 300, y_min : 220, y_max : 300 },
    quater_4 : { x_min : 100, x_max : 200, y_min : 220, y_max : 300 },
    
    // up_half     : { x_min : 100, x_max : 300, y_min : 100, y_max : 180 },
    // bottom_half : { x_min : 100, x_max : 300, y_min : 220, y_max : 300 },
    // full        : { x_min : 100, x_max : 300, y_min : 100, y_max : 300 } 
    
    up_half     : { x_min : 10, x_max : 230, y_min : 10, y_max : 230 * 3 / 5 },
    bottom_half : { x_min : 10, x_max : 230, y_min : 230 * 11 / 15, y_max : 230 },
    full        : { x_min : 10, x_max : 230, y_min : 10, y_max : 230 }
}

direction = rebuildDirection();

function init() {
    canvas = document.getElementById("fadeeva_logo_canvas");
    canvas_ctx = canvas.getContext("2d");
    
    upF = document.getElementById("up_f");
    bottomF = document.getElementById("bottom_f");

    /*
    bufferCanvas = document.createElement("canvas");
    bufferCanvas_ctx = bufferCanvas.getContext("2d");
    bufferCanvas_ctx.canvas.width = canvas_ctx.canvas.width;
    bufferCanvas_ctx.canvas.height = canvas_ctx.canvas.height;
    */
    
    canvas_ctx.drawImage(bottomF, 38, 108);
    drawPentagon(startCoordinates);
    canvas_ctx.drawImage(upF, 120, 3);
    
    drawGuideLines(showAll = true);
    //setInterval(animate, 30);    
}

function drawCircle(x, y) {
    canvas_ctx.fillStyle = kfadeevaLogoSettings.circles.color;
    canvas_ctx.beginPath();
    canvas_ctx.arc(x, y, kfadeevaLogoSettings.circles.radius, 0, 2 * Math.PI, false);
    canvas_ctx.fill();
}

function drawLines(coordinates) {   
    canvas_ctx.strokeStyle = kfadeevaLogoSettings.pentagon.color;
    canvas_ctx.lineWidth = kfadeevaLogoSettings.pentagon.lineWidth;
    
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
    canvas_ctx.fillRect(0, 0, kfadeevaLogoSettings.size, kfadeevaLogoSettings.size);

    drawGuideLines(showAll = true);    
}

function animate() {
    blank();
    movePentagon(startCoordinates);
    canvas_ctx.drawImage(bottomF, 110, 199);
    drawPentagon(startCoordinates);  
    canvas_ctx.drawImage(upF, 192, 94);
}

function rebuildDirection() {
    for(let i = 0; i < 5; i++) {
        direction[i] = getDirection();
    }
    return direction;
}

function movePentagon(startCoordinates) {
    startCoordinates.forEach(function(circle, i, coordinates) {
        moveVertex(circle, i);
    })
} 

function moveVertex(circle, num) {
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
    
    switch(num) {
        case 0 :
            quater = rect.quater_1;
            break;
        case 1 :
            quater = rect.up_half;
            break;
        case 2 :
            quater = rect.quater_2;
            break;
        case 3 :
            quater = rect.quater_3;
            break;
        case 4 :
            quater = rect.quater_4;
            break;
        default:
            quater = rect.full;
            break;
    }
    
    if(circle[0] > quater.x_max) {
        if(circle[1] < quater.y_min) {
            direction[num] = [left, right];
        } else if(circle[1] > quater.y_max) {
            direction[num] = [left, left];
        } else {
            direction[num][0] = left;
        }
    } else if(circle[0] < quater.x_min) {
        if(circle[1] < quater.y_min) {
            direction[num] = [right, right];
        } else if(circle[1] > quater.y_max) {
            direction[num] = [right, left];
        } else {
            direction[num][0] = right;
        }
    } else {
        if(circle[1] < quater.y_min) {
            direction[num] = [right, right];
        } else if(circle[1] > quater.y_max) {
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


/** *********************************
 *   Функция, которая чертит сетку
 *   и окружность для пентагона 
 * ********************************* */
function drawGuideLines(showAll = false, outerCircleBrd = false, outerRectBrd = false,                   horizontalLine = false, verticalLine = false) {
    canvas_ctx.lineWidth = 1;
    canvas_ctx.strokeStyle = "#3a3a3a";
    
    let radius = (kfadeevaLogoSettings.size - 20) / 2;
    let halfSize = kfadeevaLogoSettings.size / 2;
    
    if(showAll) {
        outerCircleBrd = true;
        outerRectBrd = true;
        horizontalLine = true;
        verticalLine = true;
    }
    
    // outer circle border
    if(outerCircleBrd) {   
        canvas_ctx.beginPath();
        canvas_ctx.arc(halfSize, halfSize, radius, 0, 2 * Math.PI, false);
        canvas_ctx.stroke();
    }
        
    // outer rectangle border
    if(outerRectBrd) {
        canvas_ctx.strokeRect(10, 10, kfadeevaLogoSettings.size - 20, kfadeevaLogoSettings.size - 20);
    }
     
    // dividing horizontal line
    if(horizontalLine) {        
        canvas_ctx.strokeStyle = "#3a3a3a";
        canvas_ctx.beginPath();
        canvas_ctx.moveTo(0, halfSize);
        canvas_ctx.lineTo(kfadeevaLogoSettings.size, halfSize);
        canvas_ctx.stroke();
    }
    
    // dividing vertical line
    if(verticalLine) {
        canvas_ctx.strokeStyle = "#3a3a3a";
        canvas_ctx.beginPath();
        canvas_ctx.moveTo(halfSize, 0);
        canvas_ctx.lineTo(halfSize, kfadeevaLogoSettings.size);
        canvas_ctx.stroke();
    }
}