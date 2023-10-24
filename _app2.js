const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let mouse = {x: undefined, y: undefined}
let particlesArray = [];
let hue = 120;

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

window.addEventListener('mousemove', function(e){
    mouse.x = e.x
    mouse.y = e.y
    spawn()
})

class Particle {
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 15 +10;
        this.speedX = Math.random() * 3 -1.5;
        this.speedY = Math.random() * 3 -1.5;
        this.color = `hsl(${hue}, 100%, 50%)`
    }
    update(){
        this.x += this.speedX
        this.y += this.speedY
        this.size -= 0.3;
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

function spawn(){
    for (let i = 0; i < 1; i++) {
        particlesArray.push(new Particle())
    }
}


function render(){
    for (let j = 0; j < particlesArray.length; j++) {
        particlesArray[j].update()
        particlesArray[j].draw()
        for (let i = 0; i < particlesArray.length; i++) {
            let dx = particlesArray[i].x - particlesArray[j].x
            let dy = particlesArray[i].y - particlesArray[j].y
            let distance = Math.sqrt(dx*dx + dy*dy)
            if(distance < 50){
                ctx.beginPath()
                ctx.strokeStyle = particlesArray[i].color
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke()
            }
        }
        if(particlesArray[j].size < 5){
            particlesArray.splice(j,1)
            j--
        }
    }
        
}
console.log(particlesArray)

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    render()
    hue+= 1.5
    requestAnimationFrame(animate)
}
animate()