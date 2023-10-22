const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//===============================//
//          RECTANGLE            //
//===============================//

// fillRect()
ctx.fillStyle= 'red'
ctx.fillRect(20,20, 200, 200)

ctx.fillStyle= 'blue'
ctx.fillRect(230,20, 200, 200)

// strokeRect()
ctx.lineWidth = 5
ctx.strokeStyle= 'yellow'
ctx.strokeRect(150, 200, 150, 100)

// clearRect()
ctx.clearRect(30, 30, 180, 180);


//===============================//
//              TEXT             //
//===============================//
ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

// fillText()
ctx.font = '30px Monospace';
ctx.fillStyle = 'green'
ctx.fillText('Salsa', 30, 250, 150); // (text, x, y, maxWidth)

// strokeText()
ctx.strokeStyle = 'orange'
ctx.lineWidth = 1;
ctx.strokeText('Project', 30, 300)

//===============================//
//              PATH             //
//===============================//
ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

// moveTo() & lineTo() & closePath()
ctx.strokeStyle = 'yellow'
ctx.beginPath();
ctx.moveTo(50, 50)
ctx.lineTo(150, 50)
ctx.lineTo(100, 200)
ctx.closePath() // this will draw strait line from last point(x,y) to the begining 
ctx.stroke()
//ctx.fillStyle = 'brown'
//ctx.fill()

// rect path
ctx.beginPath()
ctx.rect(260,100,100,100)
ctx.fill()

//===============================//
//              ARC              //
//===============================//
ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
const centerX = canvas.width / 2
const centerY = canvas.height / 2

// arc path
//face
ctx.beginPath()
ctx.arc(centerX, centerY, 200, 0, Math.PI * 2)
//mouth
ctx.moveTo(centerX + 100, centerY)
ctx.arc(centerX, centerY, 100, 0, Math.PI)
//eye 1
ctx.moveTo(centerX - 60, centerY - 80)
ctx.arc(centerX-80, centerY-80, 20,0, Math.PI * 2)
//eye2
ctx.moveTo(centerX + 100, centerY - 80)
ctx.arc(centerX+80, centerY-80, 20,0, Math.PI * 2)

ctx.stroke()
//ctx.fill()

//===============================//
//            CURVE              //
//===============================//
ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
//quadraticCurveTo()
ctx.beginPath()
ctx.moveTo(100, 70)
ctx.quadraticCurveTo(0, 0, 20, 100);
ctx.quadraticCurveTo(20, 100, 100, 170);
ctx.quadraticCurveTo(140, 140, 200, 100);
ctx.quadraticCurveTo(250, 0, 100, 70);

ctx.stroke()

//===============================//
//          ANIMATION            //
//===============================//
ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

//-------- animation 1
const circle1 = {
    x: 200,
    y: 200,
    size: 30,
    dx: 5,
    dy: 4
}

function drawCircle1(){
    ctx.beginPath()
    ctx.arc(circle1.x, circle1.y, circle1.size, 0, Math.PI*2)
    ctx.fillStyle = 'purple'
    ctx.fill();
}

function update1(){
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    drawCircle1()

    //change position
    circle1.x += circle1.dx
    circle1.y += circle1.dy

    // walls detect (COLISION)
    if(circle1.x + circle1.size > canvas.width || circle1.x - circle1.size < 0){
        circle1.dx *= -1
    }
    if(circle1.y + circle1.size > canvas.height || circle1.y - circle1.size < 0){
        circle1.dy *= -1
    }

    requestAnimationFrame(update1)
}
//update1()





//-------- animation 2

const img = document.getElementById("source");
img.style.display = 'block';
const player = {
    w: 50,
    h: 70, 
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0
}

document.addEventListener('keydown', keydown)
document.addEventListener('keyup', keyup)


function moveUp(){
    player.dy = -player.speed;
}
function moveDown(){
    player.dy = +player.speed;
}
function moveRight(){
    player.dx = +player.speed;
}
function moveLeft(){
    player.dx = -player.speed;
}
function keydown(e){
    if(e.key === "ArrowRight"){
        moveRight()   
    }else if(e.key === "ArrowLeft"){
        moveLeft()
    }else if(e.key === "ArrowUp"){
        moveUp()
    }else if(e.key === "ArrowDown"){
        moveDown()
    }
}
function keyup(e){
    if(
        e.key === 'ArrowRight' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' 
    ){
        player.dx = 0;
        player.dy = 0;
    }

}

function drawPlayer2(){
    ctx.drawImage(img, player.x, player.y, player.w, player.h)
}
function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
}
function newPos(){
    player.x += player.dx
    player.y += player.dy

    detectWalls()
}
function detectWalls(){
    if(player.x < 0){
        player.x = 0
    }
    if(player.x + player.w > canvas.width){
        player.x = canvas.width - player.w
    }
    if(player.y + player.h > canvas.height){
        player.y = canvas.height - player.h
    }
    if(player.y < 0){
        player.y = 0
    }
}

function update2(){
    clear()
    drawPlayer2()
    newPos()


    requestAnimationFrame(update2)
}

update2()