import { loadImgData } from '../utils';
import PathPainter from './PathPainter';
import PathObserver from './PathObserver';
import PathPublisher from './PathPublisher';

export default class Canvas {
  constructor(canvas, setUserAvatarPosition, socket) {
    this.canvas = canvas;
    this.socket = socket;
    this.pathObserver = new PathObserver(canvas);
    this.pathPainter = new PathPainter(canvas);
    this.pathPublisher = new PathPublisher();
    this.setUserAvatarPosition = setUserAvatarPosition;
    this.pathObserver.addEventListener('onMouseMove', this.pathPainter.onMove);
    this.pathObserver.addEventListener('onMouseDown', this.pathPainter.onDown);
    this.pathObserver.addEventListener('onMouseMove', this.pathPublisher.onMouseMove);
    this.pathObserver.addEventListener('onMouseDown', this.pathPublisher.onMouseDown);
    this.pathObserver.addEventListener('onMouseOut', this.pathPublisher.onMouseOut);
    this.prepareCanvas();
    this.socket.on('event:drawPath', this.handleDrawPath);
    this.socket.emit('plugins.drawingBoard.getBoard', null, this.handleGetBoard);
    this.pathPublisher.onSend = this.publishPath;
  }

  publishPath = (path) => {
    this.socket.emit('plugins.drawingBoard.drawPath', { path, color: this.pathPainter.getColor() });
  };

  setAllowEdit = (isAllowed) => {
    this.pathObserver.setAllowEdit(isAllowed);
  };

  prepareCanvas() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleGetBoard = (err, result) => {
    if (err) {
      console.log('error getBoard', err);
      return;
    }
    loadImgData(this.canvas, result.currentBoardImg, () => {
      if (result.board.length) {
        result.board.forEach(({ path, color }) => {
          this.pathPainter.drawPatah(path, color);
        });
      }
    });
  };

  setColor = (color) => {
    this.pathPainter.setColor(color);
  };

  handleDrawPath = (result) => {
    const { uid, path, color } = result;
    this.pathPainter.drawPatah(path, color);
    this.setUserAvatarPosition(uid, ...path[path.length - 1]);
  };

  removeEventListeners() {
    this.socket.removeListener('event:drawPath', this.handleDrawPath);
    this.pathObserver.removeCanvasEventListeners();
    this.pathObserver.removeEventListener('onMouseMove', this.pathPainter.onMove);
    this.pathObserver.removeEventListener('onMouseDown', this.pathPainter.onDown);
    this.pathObserver.removeEventListener('onMouseMove', this.pathPublisher.onMouseMove);
    this.pathObserver.removeEventListener('onMouseDown', this.pathPublisher.onMouseDown);
    this.pathObserver.removeEventListener('onMouseOut', this.pathPublisher.onMouseOut);
  }
}
