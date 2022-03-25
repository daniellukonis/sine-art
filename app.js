console.log('connected')

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const increaseF = document.querySelector('#increaseF')
const decreaseF = document.querySelector('#decreaseF')
const frequencyF = document.querySelector('#frequencyF')

const increaseR = document.querySelector('#increaseR')
const decreaseR = document.querySelector('#decreaseR')
const radiusR = document.querySelector('#radiusR')

const increaseA = document.querySelector('#increaseA')
const decreaseA = document.querySelector('#decreaseA')
const arcA = document.querySelector('#arcA')

const randomOn = document.querySelector('#randomOn')
const randomOff = document.querySelector('#randomOff')
const randomR = document.querySelector('#randomR')


function radToDeg(rad){
    return rad * 180 / Math.PI
}

function randomInt(min,max){
    return Math.floor(Math.random()*max)+min
}

function resizeCanvas(canvasElement, margin){
    let wx = window.innerWidth;
    let wy = window.innerHeight;

    (wx > wy) ? wx = wy : wy = wx;
    (!canvasElement) ? canvasElement = canvas : canvasElement;
    (margin) ? margin : margin = 25;
    canvasElement.width =  wx - margin;
    canvasElement.height = wy - margin;
}

resizeCanvas()

function clearCanvas(canvasElement, contextObject, color){
    (!canvasElement) ? canvasElement = canvas : canvasElement;
    (!contextObject) ? contextObject = context : contextObject;
    (!color) ? color = 'white' : color

    contextObject.fillStyle = color
    contextObject.fillRect(0, 0, canvasElement.width, canvasElement.height)
}

const rows = 10
const columns = 10

let cWidth = canvas.width / columns
const cHeight = canvas.height / rows

let radius = 25
let arcLength = 2 * Math.PI

function drawArc(x,y){
    context.save()
    context.strokeStyle = 'black';
    context.lineWidth = 1
    context.beginPath()
    context.translate(x,y)
    context.arc(0,0,radius,0, arcLength)
    context.stroke()
    context.restore()
}

let x = 0
let y = canvas.height * 0.5
let sinx = 0
let siny = 0

let z = 0
let w = 0.0165
function drawSine() {
    for(let i = 0; i<canvas.width+z; i+=1){
        j = i*w
        siny = (canvas.height - (radius*2) - 5)*0.5 * Math.sin(j)
        drawArc(i-z, y+siny)
    }
}

// drawSine()

function animate(){
    clearCanvas()
    drawSine()
    z += 1
    window.requestAnimationFrame(animate)
}

animate()

frequencyF.innerText = w

increaseF.addEventListener('click', ()=>{
    w += 0.005
    frequencyF.innerText = w.toPrecision(3)    
})


decreaseF.addEventListener('click', ()=>{
    w -= 0.005
    frequencyF.innerText = w.toPrecision(3)    
})

radiusR.innerText = `${radius} px`

increaseR.addEventListener('click', ()=>{
    radius += 1
    radiusR.innerText = `${radius} px`   
})


decreaseR.addEventListener('click', ()=>{
    radius -= 1;
    (!radius) ? radius=1 : radius;
    radiusR.innerText = `${radius} px`   
})

const maxArc = 2 * Math.PI 
arcA.innerText = `${arcLength.toFixed(2)} rad`

increaseA.addEventListener('click', ()=>{ 
    arcLength += radToDeg(0.005);
    (arcLength > maxArc) ? arcLength = maxArc : arcLength;
    arcA.innerText = `${arcLength.toFixed(2)} rad`
})


decreaseA.addEventListener('click', ()=>{
    arcLength -= radToDeg(0.005);
    (arcLength < 0) ? arcLength = 0 : arcLength;
    arcA.innerText = `${arcLength.toFixed(2)} rad`
})

let random = false
let randomUID = 0

function startRandom(){
    randomUID = window.setInterval(()=>{},'1000')
}

randomOn.addEventListener('click', ()=>{
    random = true
    randomR.innerText = 'on'
    randomUID = window.setInterval(()=>{

        w = Math.random()
        frequencyF.innerText = w.toPrecision(3)

        radius = randomInt(1,40)
        radiusR.innerText = `${radius} px`   

        arcLength = randomInt(0,8) + Math.random()
        arcA.innerText = `${arcLength.toFixed(2)} rad`

    },'5000')
    // console.log(randomUID)

})

randomOff.addEventListener('click', ()=>{
    random = false
    randomR.innerText = 'off'
    window.clearInterval(randomUID)
    // console.log(randomUID)
})

window.addEventListener('resize', ()=>{
    location.reload()
})

