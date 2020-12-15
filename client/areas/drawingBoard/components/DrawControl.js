export default class DrawControl {
  constructor() {
    this.path = [];
    this.tail = [];
  }

  onMouseDown = (firstDotCords) => {
    this.tail = [];
    this.path = [firstDotCords];
    this.checkForSendTask = setInterval(this.checkForSend, 200);
  };

  checkForSend = () => {
    if (!this.path.length) return;
    this.send();
  };

  onMouseMove = (Cords) => {
    this.path.push(Cords);
  };

  onMouseUp = () => {
    this.checkForSendTask && clearInterval(this.checkForSendTask);
    if (this.path.length) {
      this.send();
    }
    this.tail = [];
  };

  send = () => {
    if (!this.onSend) return;
    if (this.tail.length) {
      this.path.unshift(this.tail);
    }
    this.onSend(this.path);
    if (this.path.length > 1) {
      const i = this.path.length - 1;
      this.tail = [this.path[i][0], this.path[i][1]];
    }
    this.path = [];
  };
}
