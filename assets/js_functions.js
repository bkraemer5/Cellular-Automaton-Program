// this function creates a triangle 
function draw_triangle( contxt, c1x, c1y, c2x, c2y, c3x, c3y) {
	contxt.save(); // saves the current state of the context

	contxt.beginPath(); //starts a new path by emptying the list of subpaths
	contxt.moveTo(c1x, c1y); // starting position
	contxt.lineTo(c2x, c2y);
	contxt.lineTo(c3x, c3y);
	contxt.closePath();

	//contxt.lineWidth = 10;
	contxt.stroke();

	contxt.restore();
/*
	contxt.strokeStyle = colorOutline;
	contxt.stroke();

	contxt.fillStyle = colorFill;
	contxt.fill();
	*/

}

// this draws a grid given the context and the number of boxes
function drawGrid(contxt, xG, yG, colorG) {
	contxt.save();
	let width = contxt.canvas.width;
	let height = contxt.canvas.height;
	for (var i = 0; i < width; i += width/xG) {
		contxt.beginPath();
		contxt.moveTo(i, 0);
		contxt.lineTo(i, height);
		contxt.strokeStyle = colorG
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