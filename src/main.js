import {Line} from './line.js'

var canvas = document.getElementById('canvas')

export var config = {

export function draw() {
    if (canvas.getContext){
        var ctx = canvas.getContext('2d')
    } else {
        console.log("No canvas")
        return -1;
    }

    var render = new RenderLine({

    })

    var line = new Line({

    })
    }
