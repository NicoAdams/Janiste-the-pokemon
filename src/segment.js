export const segment = function(origin, length, angle) {
	this.origin = origin
	this.length = length
	this.angle = angle
	this.x1 = origin.x
	this.y1 = origin.y
	this.x2 = origin.x+length*Math.cos(angle)
	this.y2 = origin.y+length*Math.sin(angle)
	this.terminus = {x:this.x2,y:this.y2}

	this.render = function(gameViewport){
		gameViewport.append("line")
					.attr("x1", this.x1)
					.attr("y1", this.y1)
					.attr("x2", this.x2)
					.attr("y2", this.y2)
					.attr("stroke-width",1)
					.attr("stroke-linecap","round")
					.attr("stroke", "black");
	}
}

