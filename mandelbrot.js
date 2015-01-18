//Setting up variables
window.minX = -2.5;
window.maxX = 1;
window.minY = -1;
window.maxY = 1;

window.ctx = document.getElementById("canvas").getContext("2d");
window.c = document.getElementById("canvas");

	
	function mandel(xmin, xmax, ymin, ymax) {
		
		for (var x = 0; x < 1000; x++) {
			for (var y = 0; y < 1000; y++) {
				var newX = scale( xmax, xmin, 1000, 0, x);
				var newY = scale( ymax, ymin, 750, 0, y);
				var iter = calc(newX,newY);
			
				ctx.fillStyle = 'hsl(' + (iter * 1) + ', 100%,50%)'

				ctx.fillRect( x, y, 1, 1 );
			}
		}
	}
	
	function calc(cx, cy) {
		//If you want to understand this, read up on the Mandelbrot formula
		var x = 0;
		var y = 0;
		var maxiter = 500;
		var i = 0;
		
		while (x * x + y * y < 512 && i < maxiter) {
			var xt = x * x - y * y + cx;
			y = 2 * x * y + cy;
			x = xt;
			i++;
		}
		return i;
	}
	
	
	function scale(toMax, toMin, fromMax, fromMin, value) {
		return ((toMax - toMin) * (value - fromMin) /	(fromMax - fromMin)) + toMin;
	}
	
	function mousedown(event) {
		window.fx = event.x - c.offsetLeft;
		window.fy = event.y - c.offsetTop;
		
	}

	function mouseup(event) {
		window.ex = event.x - c.offsetLeft;
		window.ey = event.y - c.offsetTop;
		
		//Temp variables for calculation
		var maX, maY, miX, miY; 
		
		miX = scale(minX, maxX, 0, 1000, fx);
		miY = scale(minY, maxY, 0, 750, fy);
		maX = scale(minX, maxX, 0, 1000, ex);
		maY = scale(minY, maxY, 0, 750, ey);
		
		window.minX = miX;
		window.minY = miY;
		window.maxX = maX;
		window.maxY = maY;
					
		
		mandel(minX, maxX, minY, maxY);
	}



//Adding listeners used to zoom
c.addEventListener("mousedown", mousedown, false);
c.addEventListener("mouseup", mouseup, false);

//Drawing first Mandelbrot
mandel(minX, maxX, minY, maxY);
	
