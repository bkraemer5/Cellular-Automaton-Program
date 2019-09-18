// this function creates a white triangle facing North
function draw_triangle_N(contxt, posX, posY) {
	contxt.save();
	contxt.beginPath(); 
	contxt.moveTo(posX-8, posY+8); 
	contxt.lineTo(posX, posY-8);
	contxt.lineTo(posX+8, posY+8);
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
	contxt.moveTo(posX-8, posY-8); 
	contxt.lineTo(posX+8, posY);
	contxt.lineTo(posX-8, posY+8);
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
	contxt.moveTo(posX+8, posY-8); 
	contxt.lineTo(posX, posY+8);
	contxt.lineTo(posX-8, posY-8);
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
	contxt.moveTo(posX+8, posY+8); 
	contxt.lineTo(posX-8, posY);
	contxt.lineTo(posX+8, posY-8);
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

// draw square that will fit inside grid space given center position
function drawSquare(contxt, posX, posY, color) {
	contxt.fillStyle = color;
	contxt.fillRect(posX-8, posY-8, 16, 16);
}

function turnRight(dir) {
	if (dir < 3) {
		dir++;
	}
	else {
		dir = 0;
	}
}

function turnLeft(dir) {
	if (dir > 0) {
		dir--;
	}
	else {
		dir = 3;
	}
}

/*
function grabColor(contxt, posX, posY) {
	color = contxt.getImageData(posX, posY, 1, 1).data
	r = color.data[0];
	g = color.data[1];
	b = color.data[2];
	if (r == 0 && g == 0 && b == 0) {
		return 'black';
	}
	else if (r == 255 && g == 0 && b == 0) {
		return 'red';
	}
	else if (r == 255 && g == 255 && b == 0) {
		return 'yellow';
	}
	else if (r == 0 && g == 0 && b == 255) {
		return 'blue';
	}
}
*/

function move(contxt, state, dir, posX, posY, colors, moves) {
	while (posX >= 0 && posY >= 0 && posX <= contxt.canvas.width && posY <= contxt.canvas.height && moves > 0) {

		moves--;

		var temp;
		for (i=3; i > 0; i--) {
			temp = colors[i];
			colors[i] = colors[i-1];
			colors[i-1] = temp;
		}

		//drawSquare(contxt, posX, posY, colors[0]);

		space = contxt.getImageData(posX, posY, 1, 1);
		r = space.data[0];
		g = space.data[1];
		b = space.data[2];
		
		if (r == 0 && g == 0 && b == 0) {
			color = 'black';
		}
		else if (r == 255 && g == 0 && b == 0) {
			color = 'red';
		}
		else if (r == 255 && g == 255 && b == 0) {
			color = 'yellow';
		}
		else if (r == 0 && g == 0 && b == 255) {
			color = 'blue';
		}
		
		console.log(color);

		drawSquare(contxt, posX, posY, colors[0]);

		
		switch(true) {
			case color == 'black':
				if (dir < 3) {
					dir++;
				}
				else {
					dir = 0;
				}
				break;
			case color == 'red':
				if (dir < 3) {
					dir++;
				}
				else {
					dir = 0;
				}
				break;
			case color == 'yellow':
				if (dir > 0) {
					dir--;
				}
				else {
					dir = 3;
				}
				break;
			case color == 'blue':
				if (dir > 0) {
					dir--;
				}
				else {
					dir = 3;
				}
		}

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
		
		return move(contxt, state, dir, posX, posY, colors, moves);
	}

}
