export const segment = function(origin, length, angle) {
	this.origin = origin
	this.length = length
	this.angle = angle
	this.x1 = origin.x
	this.y1 = origin.y
	this.x2 = origin.x+length*Math.cos(angle)
	this.y2 = origin.y+length*Math.sin(angle)
	this.terminus = {x:this.x2,y:this.y2}

	this.render = function(ctx){
		ctx.moveTo( this.x1, this.y1);
		ctx.lineTo( this.x2, this.y2);
		ctx.lineWidth = 2;
		ctx.stroke();
	}
}

// function draw() {
//   var canvas = document.getElementById('canvas');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');

//     ctx.beginPath();
    
//     ctx.lineTo(100, 75);
//     ctx.lineTo(100, 25);
//     ctx.fill();
//   }
// }