/*
--------- RULES -----------
- Death: If the count is < 2 or > 3, the current cell is switched off.
- Survival: If the count = 2 or the count = 3 and the current cell is on, it is left unchanged.
- Birth: If the current cell is off and the count = 3, it is switched on.
*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

let canvasW = 650;
let canvasH = 650

let columns = {
    x: 0,
    y: 0,
    qte: 200
}
let rows = {
    x: 0,
    y: 0,
    qte: 200
}
let currentGridsArray = []
let nextGridsArray = []
let gridSizeW = roundedNumber(canvasW/columns.qte);
let gridSizeH = roundedNumber(canvasH/rows.qte);
let gridColor = 'lightgray';


function canvasResize() {
    canvas.width = canvasW
    canvas.height = canvasH
}
canvasResize()
window.addEventListener('resize', function () {
    canvasResize()
})

function clearCanvas() {
    ctx.clearRect(0, 0, canvasW, canvasH)
}
function getRandomBoolean() {
    return Math.random() < 0.08; // Returns true with 50% probability, false otherwise
}
function roundedNumber(floatNumber){
    return parseFloat(floatNumber.toFixed(6)); // 5 number after comma
}

function grids() {
    for (let i = 0; i < columns.qte; i++) {
        currentGridsArray.push({x: columns.x, y: columns.y, isAlive: getRandomBoolean(), neighbors:{cellsIndex: [], count: null}})
        columns.x += gridSizeW
        for (let j = 0; j < rows.qte-1; j++) {
            currentGridsArray.push({x: rows.x, y: rows.y+gridSizeH, isAlive: getRandomBoolean(), neighbors:{cellsIndex: [], count: null}})
            rows.y += gridSizeH
        }
        rows.x += gridSizeW
        rows.y = 0;
    }
}
function renderGrids(){
    for (let i = 0; i < currentGridsArray.length; i++) {
        ctx.beginPath()
        ctx.rect(currentGridsArray[i].x, currentGridsArray[i].y, gridSizeW, gridSizeH)
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = gridColor;
        ctx.fillStyle = 'black';
        ctx.stroke()
        if(currentGridsArray[i].isAlive) ctx.fill();
    }
}
function init(){
    grids()
}
/*
class Grid{
    constructor(){
        this.x = 0
        this.y = 0
        this.qte = {columns: 10, rows: 10}
        this.cellsQte= this.qte.columns*this.qte.rows
        this.gridSizeW = canvasW/this.qte.rows
        this.gridSizeH = canvasH/this.qte.columns
        this.gridColor = 'gray' 
    }
    draw(){
        for (let i = 0; i < this.cellsQte; i++) {
            currentGridsArray.push(new Grid())
            this.x += this.gridSizeW
            if(this.x === canvasW){
                this.x = 0;
                this.y += this.gridSizeH
            }
            if(this.y > canvasH){
                this.y = 0;
                this.x += this.gridSizeW
            }
        }
    }
    render(){
        for (let i = 0; i < currentGridsArray.length; i++) {
            ctx.beginPath()
            ctx.rect(currentGridsArray[i].x, currentGridsArray[i].y, this.gridSizeW, this.gridSizeH)
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = this.gridColor
            ctx.stroke()
        }
    }
}
let start = performance.now()
let end = performance.now()
console.log(end-start)
*/
init()

function findIndexByXY(array, x, y) {
    return array.findIndex(item => item.x === x && item.y === y);
}
function checkForWalls(currentCell, skippedChars){
    if(currentCell.y === 0){
            skippedChars.push('t','rt','lt')
        }
        if(currentCell.x === 0){
            skippedChars.push('l', 'lt', 'lb')
        }
        if(roundedNumber(canvasH-gridSizeH-1) < roundedNumber(currentCell.y)){
            skippedChars.push('b', 'rb', 'lb')
        }
        if(roundedNumber(canvasW-gridSizeW-1) <= roundedNumber(currentCell.x)){
            skippedChars.push('r', 'rt', 'rb')
        }
}
function countNeighbors(){
    for (let i = 0; i < currentGridsArray.length; i++) {
        let currentCell = currentGridsArray[i];
        // clear previouse data
        currentCell.neighbors.count =0
        currentCell.neighbors.cellsIndex = []

        let skippedChars = []
        let allNeighborsChars = ['t','b','r','rt','rb','l','lt','lb']
        let neighbors = {
            t: i-1,             // neighbor top cell
            b: i+1,             // neighbor bottom cell
            r: i+rows.qte,      // neighbor right cell
            rt: i+rows.qte-1,   // neighbor right_top cell
            rb: i+rows.qte+1,   // neighbor right_bottom cell
            l: i-rows.qte,      // neighbor left cell
            lt: i-rows.qte-1,   // neighbor left_top cell
            lb: i-rows.qte+1    // neighbor left_bottom cell
        }
        // check for walls
        checkForWalls(currentCell, skippedChars)

        //count neighbors
        allNeighborsChars.forEach(char=>{
            if(skippedChars.indexOf(char) === -1){
                if(currentGridsArray[neighbors[char]]?.isAlive){
                    currentCell.neighbors.cellsIndex.push(neighbors[char]+1)
                    currentCell.neighbors.count++
                }else{
                    currentCell.neighbors.count+=0
                } 
            }
        })
    }
    
}
countNeighbors()

function update(){
    for (let i = 0; i < currentGridsArray.length; i++) {
        let currentCell = currentGridsArray[i]
        let isBirth = currentCell.neighbors.count === 3;
        let isSurvival = currentCell.neighbors.count === 2 || currentCell.neighbors.count === 3;
        let isDeath = currentCell.neighbors.count < 2 || currentCell.neighbors.count > 3
        
        if(!currentCell.isAlive && isBirth){
            // birth
            currentCell.isAlive = true;
            ctx.beginPath()
            ctx.fillStyle = 'blue'
            ctx.rect(currentCell.x, currentCell.y, gridSizeW, gridSizeH)
            ctx.fill()
        }else if(currentCell.isAlive && isSurvival){
            // survival
        }else if(currentCell.isAlive && isDeath){
            //death
            currentCell.isAlive = false;
            ctx.beginPath()
            ctx.fillStyle = 'white'
            ctx.rect(currentCell.x, currentCell.y, gridSizeW, gridSizeH)
            ctx.fill()
        }
    }
}

setInterval(()=>{
    clearCanvas()
    countNeighbors()
    update()
},50)
function animate(){
    requestAnimationFrame(animate)
}
//animate()


//console.log(currentGridsArray)
console.log(`--------- RULES -----------
- Death: If the count is < 2 or > 3, the current cell is switched off.
- Survival: If the count = 2 or the count = 3 and the current cell is on, it is left unchanged.
- Birth: If the current cell is off and the count = 3, it is switched on.`)