const canvas = document.getElementById('canvas1');
// get canvas context
const ctx = canvas.getContext('2d')
//canvas height & width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particalesArray = [];
let hue = 0;




window.addEventListener('resize', function () {
    //canvas height & width
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined
}
canvas.addEventListener('click', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 10; i++) {
        particalesArray.push(new Particale())
    }
})
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 1; i++) {
        particalesArray.push(new Particale())
    }
})

class Particale{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

function handleParticales(){
    for (let i = 0; i < particalesArray.length; i++) {
        particalesArray[i].update()
        particalesArray[i].draw()
        for (let j = i; j < particalesArray.length; j++) {
            const dx = particalesArray[i].x - particalesArray[j].x;
            const dy = particalesArray[i].y - particalesArray[j].y;
            // pythagros theory √(dx²+dy²)
            const distance = Math.sqrt(dx*dx + dy*dy); 
            if(distance < 100){
                ctx.beginPath()
                ctx.strokeStyle = particalesArray[i].color
                ctx.moveTo(particalesArray[i].x, particalesArray[i].y)
                ctx.lineTo(particalesArray[j].x, particalesArray[j].y)
                ctx.stroke()
            }
        }
        if(particalesArray[i].size <= 2){
            particalesArray.splice(i, 1)
            console.log(particalesArray.length)
            i--;
        }
    }
}
    

function animate(){
    // clear canvas || hide particles trails
    ctx.clearRect(0,0, canvas.width, canvas.height)
    // show particles trails
    //ctx.fillStyle= 'rgba(0,0,0,0.06)'
    //ctx.fillRect(0,0, canvas.width, canvas.height)
    handleParticales()
    hue+= 2;
    requestAnimationFrame(animate)
}
animate()