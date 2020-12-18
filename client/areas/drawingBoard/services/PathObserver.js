import { Dispatcher } from '_core/utils';

export default class PathObserver {
  constructor(canvas) {
    this.allowEdit = false;
    this.isMouseDown = false;
    this.canvas = canvas;
    this.dispacher = new Dispatcher();
    this.setAllowEdit = this.setAllowEdit.bind(this);
    this.addCanvasEventListeners();
  }

  addEventListener = (eventName, callback) => {
    this.dispacher.on(eventName, callback);
  };

  removeEventListener = (eventName, callback) => {
    this.dispacher.off(eventName, callback);
  };

  setAllowEdit(allowEdit) {
    this.allowEdit = allowEdit;
  }

  getCordinates(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const currX = clientX - rect.left;
    const currY = clientY - rect.top;
    return [currX, currY];
  }

  onMove = (clientX, clientY) => {
    if (!this.allowEdit || !this.isMouseDown) return;
    this.dispacher.dispatch('onMouseMove', this.getCordinates(clientX, clientY));
  };

  onDown = (clientX, clientY) => {
    if (!this.allowEdit) return;
    this.isMouseDown = true;
    this.dispacher.dispatch('onMouseDown', this.getCordinates(clientX, clientY));
  };

  onMouseOut = () => {
    if (!this.allowEdit) return;
    if (this.isMouseDown) {
      this.dispacher.dispatch('onMouseOut');
    }
    this.isMouseDown = false;
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

  addCanvasEventListeners() {
    this.canvas.addEventListener('touchmove', this.onTouchMove, false);
    this.canvas.addEventListener('touchstart', this.onTouchStart, false);
    this.canvas.addEventListener('touchend', this.onMouseOut, false);
    this.canvas.addEventListener('touchcancel', this.onMouseOut, false);

    this.canvas.addEventListener('mousemove', this.onMouseMove, false);
    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseOut, false);
    this.canvas.addEventListener('mouseout', this.onMouseOut, false);
  }

  removeCanvasEventListeners() {
    this.canvas.removeEventListener('touchmove', this.onTouchMove);
    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    this.canvas.removeEventListener('touchend', this.onMouseOut);
    this.canvas.removeEventListener('touchcancel', this.onMouseOut);

    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseOut);
    this.canvas.removeEventListener('mouseout', this.onMouseOut);
  }
}
