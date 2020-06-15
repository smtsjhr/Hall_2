
const enable_interaction = true;
var get_mouse_pos = false;
var get_touch_pos = false;


var stop_animation = false;


var phase = 10;
var interaction_variables = [phase];

var t = 0;
var t_rate = .003;


var fps = 60;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


startAnimating(fps);


function draw() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    
    ctx.fillStyle = `rgba(0,0,0,1)`;
    ctx.fillRect(0, 0, W, H);

    for(let j=101; j--; ) {
        let hue = (10*t)%360;
        ctx.fillStyle= `hsla(${hue}, 100%, ${90*((j+1)%2)}%, 1)`;
        ctx.fillRect(W/2+(z=Math.cos(t/100)*Math.cos(a=j-j%2)*(k=1.03**a)-(d=10*k*(j%2+5*Math.sin(j*t/phase)))/2),H/2+z,1*d,d);
    }
  
    t += t_rate;
    
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    if (!stop_animation) {
        animate();
    }
 }
 
 function animate(newtime) {
    
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();    
     }

    if(enable_interaction) {
        canvas.addEventListener('mousedown', e => {
            get_mouse_pos = true;
            getMousePosition(canvas, e)
        });
            
        canvas.addEventListener('mouseup', e => {
            get_mouse_pos = false;
        });
        
        canvas.addEventListener('mousemove', function(e) {
            if(get_mouse_pos) {
                getMousePosition(canvas, e)
            }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
            
        canvas.addEventListener('touchend', function(e) {
        
        }, false);
            
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
    }
   
 }
 
 
function getMousePosition(canvas, event) {
    interaction(canvas,event, ...interaction_variables)
}

function getTouchPosition(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event, ...interaction_variables)
}


function interaction(canvas, event, ...interaction_variables) {

    mouse_x = event.clientX/canvas.width;
    mouse_y = event.clientY/canvas.height;

    x_center = mouse_x - 0.5;
    y_center = mouse_y - 0.5;

    mouse_r = Math.sqrt(x_center**2 + y_center**2)
    //mouse_a = Math.atan2(y_center,x_center);

    phase = 1 + 20*mouse_r**2;

}

