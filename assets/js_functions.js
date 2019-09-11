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

function move(contxt, dir, tri, posX, posY, color) {
	/* if (posX < 0 || posY < 0) { 
		break;
	}
	
	else {*/
		drawSquare(contxt, posX, posY, color);
		switch(color) {
			case 'black':
				// turn right
				if (dir < 3) {
					dir++;
				}
				else {
					dir = 0;
				}
				color = 'red';
				break;
			case 'red':
				// turn right
				if (dir < 3) {
					dir++;
				}
				else {
					dir = 0;
				}
				color = 'yellow';
				break;
			case 'yellow':
				// turn left
				if (dir > 0) {
					dir--;
				}
				else {
					dir = 3;
				}
				color = 'blue';
				break;
			case 'blue':
				// turn left
				if (dir > 0) {
					dir--;
				}
				else {
					dir = 3;
				}
				color = 'black';
		}

		switch(dir) {
			case 0:
				// triangle -> north
				posY-=18;
				drawSquare(contxt, posX, posY, color);
				tri = draw_triangle_N(contxt, posX, posY);
				break;
			case 1:
				// triangle -> east
				posX+=18;
				drawSquare(contxt, posX, posY, color);
				tri = draw_triangle_E(contxt, posX, posY);
				break;
			case 2:
				// triangle -> south
				posY+=18;
				drawSquare(contxt, posX, posY, color);
				tri = draw_triangle_S(contxt, posX, posY);
				break;
			case 3:
				// triangle -> west
				posX-=18;
				drawSquare(contxt, posX, posY, color);
				tri = draw_triangle_W(contxt, posX, posY);
		}
		return move(contxt, dir, tri, posX, posY, color);
	}
	//return move(contxt, dir, tri, posX, posY, color);
//}
