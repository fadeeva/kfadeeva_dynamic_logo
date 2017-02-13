window.onload = function() {
    var theCanvas = document.getElementById('canvas');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
             
            var degrees = 173;
            var radians = (Math.PI /180) * degrees;
            var radius = 9;
            var x = 0;
            var y = 0;
            ctx.fillStyle = "#c3a157";
            
            function drawCircle (x, y) {
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                ctx.fill();
            }
            
            x = 200;
            y = 120;
            drawCircle(x, y);
            
            x = 160;
            y = 250;
            drawCircle(x, y);
            
            x = 238;
            y = 250;
            drawCircle(x, y);
            
            x = 120;
            y = 175;
            drawCircle(x, y);
            
            x = 280;
            y = 175;
            drawCircle(x, y);
        }
    }
}