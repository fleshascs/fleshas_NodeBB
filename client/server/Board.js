class Board {
  constructor(canvas) {
    this.allowEdit = true;
    this.flag = false;
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    this.x = 'black';
    this.y = 2;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawPatah(path, colorHex) {
    const color = colorHex || this.x;
    this.ctx.beginPath();
    if (path.length === 1) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(path[0][0], path[0][1], 2, 2);
    } else if (path.length > 1) {
      this.ctx.moveTo(path[0][0], path[0][1]);
      path.forEach((cords) => {
        this.ctx.lineTo(cords[0], cords[1]);
      });
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = this.y;
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }
}

module.exports = Board;
