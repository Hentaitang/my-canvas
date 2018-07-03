var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

setCanvasSize(yyy)

listenToUser(yyy)

var usingEraser = false
eraser.onclick = function(){
    usingEraser = true
    action.className = 'action x'
}

brush.onclick = function(){
    usingEraser = false
    action.className = 'action'
}

/****************/
function setCanvasSize(canvas){
    page()
    window.onresize = function(){
        page()
    }
    function page(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke()
    context.closePath()
}

function listenToUser(yyy){
    function drawCircle(x,y,radius){
        context.beginPath();
        context.arc(x, y, radius, 0, 360);
        context.fill();
    }

    var painting = false
    var lastPoint = {x: undefined, y: undefined}
    // 特性检测
    if(document.body.ontouchstart !== undefined){
        // 触屏设备
        yyy.ontouchstart = function(a){
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            painting = true
            if(usingEraser){
            context.clearRect(x-5,y-5,30,30)
            }else{
            lastPoint = {'x': x, 'y': y}
            radius = 2
            drawCircle(x,y,radius)
            }
        }
        
        yyy.ontouchmove = function(a){
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
                    
            if(!painting) return
                    
            if(usingEraser){
            context.clearRect(x-5,y-5,30,30)
            }else{
            var newPoint = {'x': x, 'y': y}
            radius = 2
            drawCircle(x,y,radius)
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
            }
        }
        
        yyy.ontouchend = function(){
            painting = false
        }
    }else{
        // 非触屏检测
        yyy.onmousedown = function(a){
            var x = a.clientX
            var y = a.clientY
            painting = true
            if(usingEraser){
            context.clearRect(x-5,y-5,30,30)
            }else{
            lastPoint = {'x': x, 'y': y}
            radius = 2
            drawCircle(x,y,radius)
            }
        }
    
        yyy.onmousemove = function(a){
            var x = a.clientX
            var y = a.clientY
                    
            if(!painting) return
                    
            if(usingEraser){
            context.clearRect(x-5,y-5,30,30)
            }else{
            var newPoint = {'x': x, 'y': y}
            radius = 2
            drawCircle(x,y,radius)
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
            }
        }
    
        yyy.onmouseup = function(a){
            painting = false
        }
    }
}

