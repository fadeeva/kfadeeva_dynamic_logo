var startCoordinates = [ [200, 130], [160, 260], [238, 260], [120, 185], [280, 185] ];

window.onload = function() {
    var theCanvas = document.getElementById('canvas');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            
            var radius = 9;
            var x = 0;
            var y = 0;
            ctx.fillStyle = "#c3a157";
            
            function drawCircle (x, y) {
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                ctx.fill();
            }
            
            startCoordinates.forEach(function(xy, i, startCoordinates) {
                drawCircle(xy[0], xy[1]);
            })
            
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
}