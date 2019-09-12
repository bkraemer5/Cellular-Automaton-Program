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

function move(contxt, dir, posX, posY, color, colors, moves) {
	while (posX >= 0 && posY >= 0 && posX <= contxt.canvas.width && posY <= contxt.canvas.height && moves > 0) {
		moves--;
		drawSquare(contxt, posX, posY, color);
		
		var temp;
		for (i=3; i > 0; i--) {
			temp = colors[i];
			colors[i] = colors[i-1];
			colors[i-1] = temp;
		}

		//var condition = true;
		switch(true) {
			case color == colors[0]:
				console.log("0");
				if (dir < 3) {
					dir++;
				}
				else {
					dir = 0;
				}
				color = colors[1];
				break;
			case color == colors[1]:
				console.log("1");
				if (dir < 3) {
					dir++;
				}
				else {
					dir = 0;
				}
				color = colors[2];
				break;
			case color == colors[2]:
				console.log("2");
				if (dir > 0) {
					dir--;
				}
				else {
					dir = 3;
				}
				color = colors[3];
				break;
			case color == colors[3]:
				console.log("3");
				if (dir > 0) {
					dir--;
				}
				else {
					dir = 3;
				}
				color = colors[0];
		}
	

		switch(dir) {
			case 0:
				// triangle -> north
				posY-=18;
				drawSquare(contxt, posX, posY, color);
				draw_triangle_N(contxt, posX, posY);
				break;
			case 1:
				// triangle -> east
				posX+=18;
				drawSquare(contxt, posX, posY, color);
				draw_triangle_E(contxt, posX, posY);
				break;
			case 2:
				// triangle -> south
				posY+=18;
				drawSquare(contxt, posX, posY, color);
				draw_triangle_S(contxt, posX, posY);
				break;
			case 3:
				// triangle -> west
				posX-=18;
				drawSquare(contxt, posX, posY, color);
				draw_triangle_W(contxt, posX, posY);
		}
		return move(contxt, dir, posX, posY, color, colors, moves);
	}

}
