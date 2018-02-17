const DISTANCE = 35, SIZE = 8;

function Clock(x,y,r){
	this.x = x;
	this.y = y;
	this.currTime = Date.now();

	this.time = [ //pos, radius, angle
		{pos: createVector(), r: 210, a: null}, //ms
		{pos: createVector(), r: 180, a: null}, //min
		{pos: createVector(), r: 150, a: null}  //h
	];

	this.textTime = "";
	this.textColor;

	this.calculate();
}

Clock.prototype.calculate = function(){
	//ms
	this.time[0].a = map((new Date().getMilliseconds() + new Date().getSeconds()*1000), 0, 60000, 0, TWO_PI) - PI/2;

	//min
	this.time[1].a = map(new Date().getMinutes(), 0, 60, 0, TWO_PI) + map(new Date().getSeconds(), 0, 60, 0, PI/30) - PI/2;

	//hours
	this.time[2].a = map(new Date().getHours(), 0, 12, 0, TWO_PI) + map(new Date().getMinutes(), 0, 60, 0, PI/30) - PI/2;

	//this.radMinutes = map((new Date().getMinutes()), 0, 60, 0, TWO_PI) - PI/2;

	//calculate Vectors relative to time
	//this.time[0].pos.set(cos(this.time[0].r) * this.millis.r, sin(this.time[0].r) * this.millis.r);

	for(let i = 0; i < 3; i++){
		let t = this.time[i]; //time array

		t.pos.set(cos(t.a) * t.r, sin(t.a) * t.r);
	}
}

Clock.prototype.update = function () {
	this.calculate();
	let t = new Date();
	let min = t.getMinutes() < 10 && t.getMinutes() >= 0 ? "0" : "";
	let sec = t.getSeconds() < 10 && t.getSeconds() >= 0 ? "0" : "";

	this.textTime = `${t.getHours()}:${min}${t.getMinutes()}:${sec}${t.getSeconds()}`;
	this.textColor = map(t.getHours(), 0, 24, 0, 360);
	console.log(this.textColor)
};

Clock.prototype.draw = function () {
	background(50);

	noFill();
	// stroke(200,100,100);
	noStroke()
	strokeWeight(8);

	ellipse(this.x, this.y, this.rClock*2);

	push();

	translate(this.x, this.y);

	fill("hsl(" + this.textColor + ",100%,50%)")
	text(this.textTime, 0, 20);

	fill("red");
	noStroke();

	for(let theta = 0; theta <= TWO_PI; theta += PI/30){
		for(let t = 0; t < 3; t++){
			let size = SIZE;
			let type = this.time[t];
			let x = cos(theta)*type.r;
			let y = sin(theta)*type.r;
			let d = dist(x, y, type.pos.x, type.pos.y);

			if(d <= DISTANCE){
				size = map(d, 0, DISTANCE, 13, SIZE);
				let h = floor(map(d, 0, DISTANCE, 100, 200));
				fill(`hsl(${h}, 100%, 50%)`);
				ellipse(x,y,size);
				continue;
			}

		fill("hsl(200, 100%, 50%)");
		ellipse(x,y,size);
		}
	}

	pop();
};
