export const segment = function (origin, length, angle) {
  this.origin = origin;
  this.length = length;
  this.angle = angle;
  this.x1 = Math.floor(origin.x);
  this.y1 = Math.floor(origin.y);
  this.x2 = Math.floor(origin.x + length * Math.cos(angle));
  this.y2 = Math.floor(origin.y + length * Math.sin(angle));
  this.terminus = { x: this.x2, y: this.y2 };
};

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
