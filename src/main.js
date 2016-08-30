//main import line and render and calls a single recursive function and the intial
//config values for the two classes that are then passed

import {Line} from './line.js';

var canvas = document.getElementById('canvas');

export var config = {
	someShit: 

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
