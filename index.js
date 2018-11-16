let l;
let canvas;

function setup() {

    let clientHeight = document.getElementById('text').clientHeight
    let clientWidth = document.getElementById('text').clientWidth

    var canvas = createCanvas(clientWidth, clientHeight)
    canvas.parent("text")
    canvas.style('z-index','-1')
    canvas.style('position','absolute')

    frameRate(60)

    l = new Line()

}

function windowResized() {

    let clientHeight = document.getElementById('text').clientHeight
    let clientWidth = document.getElementById('text').clientWidth

    resizeCanvas(clientWidth, clientHeight)

}

function draw() {

    background(255)

    translate(width / 2, height / 2)

    l.update()
    l.render()

}

class Line {

    constructor() {

        this.x = 0
        this.y = 0

        this.radius = 100

        this.newPoint = createVector(random(width), random(height))

        this.lastPoint = createVector(this.x, this.y)

        this.r = 10

        this.path = [createVector(this.newPoint.x, this.newPoint.y)]

    }

    update() {

        if (floor(this.x) != floor(this.newPoint.x) && floor(this.y) != floor(this.newPoint.y)) {

            this.x = lerp(this.x, this.newPoint.x, 0.05)
            this.y = lerp(this.y, this.newPoint.y, 0.05)

        } else {

            this.lastPoint = this.newPoint

            this.path.push(this.lastPoint)

            this.newPoint = createVector(random(-width/2, width/2), random(-height/2, height/2))

        }

        if ((this.path.length % 10) === 0) {

            console.log('ok')

        }

    }

    render() {

        stroke(255, 0, 100, 100)
        strokeWeight(2)
        line(this.lastPoint.x, this.lastPoint.y, this.x, this.y)

        fill(255, 0, 100, 100)
        ellipse(this.lastPoint.x, this.lastPoint.y, this.r)
        ellipse(this.x, this.y, this.r)
        ellipse(this.newPoint.x, this.newPoint.y, this.r)

        beginShape()
        for (let p of this.path) {

            noFill()
            vertex(p.x, p.y)

        }
        endShape()

        for (let p of this.path) {

            fill(255, 0, 100, 100)
            noStroke()
            ellipse(p.x, p.y)

        }

    }

}