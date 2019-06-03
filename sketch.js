//One way flag variable to see if the visualization has started
var started = false;

function preload(){
	//get note frequencies
	//notes = loadJSON('notes.json')
}

//Start when the user presses the mouse as per chromes autoplay policy
function mousePressed() {
	//setup mic
	mic = new p5.AudioIn();
	mic.start();
	
	//setup canvas
	createCanvas(windowWidth, windowHeight);
		
	//setup fft
	fft = new p5.FFT();
	fft.setInput(mic);
	started = true;
}

function draw() {
	if (started){
		visualize();
	}else{
		fill(255,255,255);
		text('PRESS TO START',0,0);
		console.log(started);
	}
}

function visualize(){
//change stripe color based on frequencies
	fft.analyze()
	energies = [fft.getEnergy('bass'),fft.getEnergy('lowMid'),fft.getEnergy('mid'),fft.getEnergy('highMid'),fft.getEnergy('treble')]
	
//draw the background shapes
	noStroke();
	
	fill(255-energies[4],100,energies[4]);
	rect(0,0,width,height/5);
	
	fill(255-energies[3],100,energies[3]);
  rect(0,0 + height/5,width,height/5 );
	
	fill(255-energies[2],100,energies[2]);
	rect(0,0 + 2*(height/5),width,height/5);
	
	fill(255-energies[1],100,energies[1]);
	rect(0,0 + 3*(height/5),width,height/5);
	
	fill(255-energies[0],100,energies[0]);
	rect(0,0 + 4*(height/5),width,height/5);
	
	/*
	-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	*/
	
//shift origin to center of screen
translate(width/2, height/2);


	
//draw radial wave
	//get the frequencies and declare some variables
	frequencies = fft.waveform()
	len = frequencies.length
	BASE_RADIUS = 30;

//draw the shape
	fill('#42c2f4')
	beginShape();
	for (var i=0;i<len;i++){
		//calculate the angle
		angle = map(i, 0, len, 0, 2*PI);
		
		//change magnitude based on frequency
		r = BASE_RADIUS*map(frequencies[i],-1, 1, 0, 10);

		//create vector
		v = p5.Vector.fromAngle(angle, r);
		
		//add the vertex
		vertex(v.x, v.y);
	}
	//close the shape
	endShape(CLOSE);
	
	/*
	-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	*/
	fill(20);
	textSize(200);
	textAlign(CENTER,CENTER);
	//between 0 and ten, the mapping of r for the radial wave
	text('A',BASE_RADIUS*-5 ,BASE_RADIUS*-5,BASE_RADIUS*10,BASE_RADIUS*10);
	fill(100,200);
	console.log(mouseX - width/2,mouseY - height/2);

}
	
