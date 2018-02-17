"use strict";

//VARIABLES
let clock;

function setup(){
	createCanvas(500,500);

	clock = new Clock(width/2, height/2, 200);

	textFont('Lato');
	textSize(60);
	textAlign(CENTER)
}

function draw(){
	clock.update();
	clock.draw();
}
