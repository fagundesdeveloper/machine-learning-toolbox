//main import line and render and calls a single recursive function and the intial
//config values for the two classes that are then passed

import {Line} from './line.js';

var canvas = document.getElementById('canvas');

export var config = {
<<<<<<< HEAD
	size: canvas.width,
    direction: something,
    stroke: 'black',
    angle: 

    get direction(){
        return this.direction
    },

=======
	someShit: 
	//f
>>>>>>> c31f7eb48b9d014498fc8964821ecf5015fc21a5
	//will have initial values, 

}


export function draw() {
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
    } else {
        console.log("No canvas")
        return -1;
    }

    var render = new RenderLine({

    })

    var line = new Line({

    })
    }
