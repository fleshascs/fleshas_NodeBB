export default class Board {
  constructor(canvas) {
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
    this.addEventListeners();

    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  changeColor = (colorHex) => {
    this.x = colorHex;
  };

  getColor = () => {
    return this.x;
  };

  drawPatah = (path, colorHex) => {
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
  };

  onMove = (clientX, clientY) => {
    if (this.flag) {
      this.prevX = this.currX;
      this.prevY = this.currY;
      const rect = this.canvas.getBoundingClientRect();
      this.currX = clientX - rect.left;
      this.currY = clientY - rect.top;
      this.draw();
      if (this.onMouseMove77) {
        this.onMouseMove77([this.currX, this.currY]);
      }
    }
  };

  onDown = (clientX, clientY) => {
    this.prevX = this.currX;
    this.prevY = this.currY;
    const rect = this.canvas.getBoundingClientRect();
    this.currX = clientX - rect.left;
    this.currY = clientY - rect.top;
    this.flag = true;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.x;
    this.ctx.fillRect(this.currX, this.currY, 2, 2);
    this.ctx.closePath();
    if (this.onMouseDown77) {
      this.onMouseDown77([this.currX, this.currY]);
    }
  };

  onMouseMove = (e) => {
    this.onMove(e.clientX, e.clientY);
  };

  onTouchMove = (e) => {
    e.preventDefault();
    this.onMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  onMouseDown = (e) => {
    this.onDown(e.clientX, e.clientY);
  };

  onTouchStart = (e) => {
    e.preventDefault();
    this.onDown(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  onMouseOut = () => {
    if (this.flag && this.onMouseUp77) {
      this.onMouseUp77();
    }
    this.flag = false;
  };

  addEventListeners() {
    this.canvas.addEventListener('touchmove', this.onTouchMove, false);
    this.canvas.addEventListener('touchstart', this.onTouchStart, false);
    this.canvas.addEventListener('touchend', this.onMouseOut, false);
    this.canvas.addEventListener('touchcancel', this.onMouseOut, false);

    this.canvas.addEventListener('mousemove', this.onMouseMove, false);
    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseOut, false);
    this.canvas.addEventListener('mouseout', this.onMouseOut, false);
  }
}
