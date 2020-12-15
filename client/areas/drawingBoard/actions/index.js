export const TOGGLE_BOARD = 'areas/drawingBoard/toggleBoard';

export function toggleBoard(isBoardEnabled) {
  return {
    type: TOGGLE_BOARD,
    isBoardEnabled
  };
}
