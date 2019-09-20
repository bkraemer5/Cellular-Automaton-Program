// this function creates a white triangle facing North
function draw_triangle_N(contxt, posX, posY) {
	contxt.save();
	contxt.beginPath(); 
	contxt.moveTo(posX-7, posY+7); 
	contxt.lineTo(posX, posY-7);
	contxt.lineTo(posX+7, posY+7);
	contxt.closePath();
	contxt.fillStyle = 'white';
	contxt.fill();
	contxt.strokeStyle = 'black';
	contxt.stroke();

	contxt.restore();

}


// this function creates a white triangle facing East
function draw_triangle_E(contxt, posX, posY) {
	contxt.save();

	contxt.beginPath(); 
	contxt.moveTo(posX-7, posY-7); 
	contxt.lineTo(posX+7, posY);
	contxt.lineTo(posX-7, posY+7);
	contxt.closePath();
	contxt.fillStyle = 'white';
	contxt.fill();
	contxt.strokeStyle = 'black';
	contxt.stroke();

	contxt.restore();
}

// this function creates a white triangle facing South
function draw_triangle_S(contxt, posX, posY) {
	contxt.save();

	contxt.beginPath(); 
	contxt.moveTo(posX+7, posY-7); 
	contxt.lineTo(posX, posY+7);
	contxt.lineTo(posX-7, posY-7);
	contxt.closePath();
	contxt.fillStyle = 'white';
	contxt.fill();
	contxt.strokeStyle = 'black';
	contxt.stroke();

	contxt.restore();
}
// this function creates a white triangle facing West
function draw_triangle_W(contxt, posX, posY) {
	contxt.save();

	contxt.beginPath(); 
	contxt.moveTo(posX+7, posY+7); 
	contxt.lineTo(posX-7, posY);
	contxt.lineTo(posX+7, posY-7);
	contxt.closePath();
	contxt.fillStyle = 'white';
	contxt.fill();
	contxt.strokeStyle = 'black';
	contxt.stroke();

	contxt.restore();
}

// this draws a grid given the context, the number of boxes, and the color of the lines
function drawGrid(contxt, xG, yG, colorG) {
	contxt.save();
	let width = contxt.canvas.width;
	let height = contxt.canvas.height;
	for (var i = 0; i < width; i += width/xG) {
		contxt.beginPath();
		contxt.moveTo(i, 0);
		contxt.lineTo(i, height);
		contxt.strokeStyle = colorG;
		contxt.lineWidth = 0.5;
		contxt.stroke();
	}
	for (var j = 0; j < height; j += height/yG) {
		contxt.beginPath();
		contxt.moveTo(0, j);
		contxt.lineTo(width, j);
		contxt.strokeStyle = colorG;
		contxt.lineWidth = 0.5;
		contxt.stroke();
	}
	contxt.restore();
}

// draws a square that will fit inside grid space given center position
function drawSquare(contxt, posX, posY, color) {
	contxt.save();

	contxt.fillStyle = color;
	contxt.fillRect(posX-8, posY-8, 16, 16);

	contxt.restore();
}

/* recursive function to move the user along the grid using the cella algorithm
	takes in 7 Parameters:
		1. contxt is the context (canvas) we are working with
		2. state is the current state we are in 
		3. dir is the direction the mover is facing
		4. posX is the X position the mover is on in the canvas
		5. posY is the Y position the mover is on in the canvas
		6. colors is the array of colors we are working with
		7. moves is the amount of moves the mover will make
*/
function move(contxt, state, dir, posX, posY, colors, moves) {
	contxt.save();

	// BREAK CASE
	if (moves == 0) {
		return;
	}

	// 'moves' decrements its self after each call to the function
	moves--;
	
	// grabs the color of the square the mover is currently on
	var space = contxt.getImageData(posX-8, posY-8, 1, 1);
	r = space.data[0];
	g = space.data[1];
	b = space.data[2];

	// compares each combination of rgb values. the color determines the state
	if (r == 0 && g == 0 && b == 0) {
		state = 0;
	}
	else if (r == 255 && g == 0 && b == 0) {
		state = 1;
	}
	else if (r == 255 && g == 255 && b == 0) {
		state = 2;
	}
	else if (r == 0 && g == 0 && b == 255) {
		state = 3;
	}

	// draws the colored square on the board. should be the next color in the sequence
	drawSquare(contxt, posX, posY, colors[++state]);
	state--;

	// given the state, we determine whether the mover turns left or right
	// this is done using the 'dir' variable
	switch(true) {
		case (state == 0 || state == 1):
			// turn left
			if (dir > 0) {
				dir--;
			}
			else {
				dir = 3;
			}
			break;
		case (state == 2 || state == 3):
			// turn right
			if (dir < 3) {
				dir++;
			}
			else {
				dir = 0;
			}
			break;
	}

	// after the direction has been manipulated by the previous switch statement,
	// we move the mover in its new direction
	switch(dir) {
		case 0:
			// triangle -> north
			posY-=18;
			draw_triangle_N(contxt, posX, posY);
			break;
		case 1:
			// triangle -> east
			posX+=18;
			draw_triangle_E(contxt, posX, posY);
			break;
		case 2:
			// triangle -> south
			posY+=18;
			draw_triangle_S(contxt, posX, posY);
			break;
		case 3:
			// triangle -> west
			posX-=18;
			draw_triangle_W(contxt, posX, posY);
	}

	contxt.restore();

	// executes every 1/10 of a second
	setTimeout(move, 100, contxt, state, dir, posX, posY, colors, moves);

	return;
}

