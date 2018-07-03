var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var linewidth = 5;

setCanvasSize(yyy)

context.clearStyle = 'red'
context.clearRect(0,0,yyy.width,yyy.height);

listenToUser(yyy)

var usingEraser = false
pen.onclick = function(){
    usingEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    usingEraser = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

save.onclick = function(){
    var link = document.createElement('a')
    document.body.appendChild(link)
    link.download = '画.png';
    link.href = yyy.toDataURL("image/png")
    link.click()
}

cover.onclick = function clearCanvas(){  
    context.clearRect(0,0,yyy.width,yyy.height);  
}  

black.onclick = function(){
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}

red.onclick = function(){
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}

green.onclick = function(){
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}

yellow.onclick = function(){
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.add('active')
    black.classList.remove('active')
}

thin.onclick = function(){
    linewidth = 5
}

thick.onclick = function(){
    linewidth = 10
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
    context.lineWidth = linewidth;
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

