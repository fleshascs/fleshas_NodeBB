export default class PathPainter {
  constructor(canvas) {
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    this.x = 'black';
    this.y = 2;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setColor = this.setColor.bind(this);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.x;
    this.ctx.lineWidth = this.y;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  setColor(colorHex) {
    this.x = colorHex;
  }
  getColor() {
    return this.x;
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

  onMove = ([clientX, clientY]) => {
    this.prevX = this.currX;
    this.prevY = this.currY;
    this.currX = clientX;
    this.currY = clientY;
    this.draw();
  };

  onDown = ([clientX, clientY]) => {
    this.prevX = this.currX;
    this.prevY = this.currY;
    this.currX = clientX;
    this.currY = clientY;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.x;
    this.ctx.fillRect(this.currX, this.currY, 2, 2);
    this.ctx.closePath();
  };
}
