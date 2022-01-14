document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const board = document.querySelector('#board');

  const head = new Head(board);

  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
      console.log('pressed left');
      head.currentDirection = 'left';
    }
  });

  //task 1. program event listener to respond to arrow down, up, left, right
  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
      console.log('pressed down');
      head.currentDirection = 'down';
    }
  });

  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
      console.log('pressed up');
      head.currentDirection = 'up';
    }
  });

  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
      console.log('pressed right');
      head.currentDirection = 'right';
    }
  });

  body.addEventListener('keydown',(e) => {
    if (e.code === 'Enter'){
      console.log('pressed enter');
      move();
    }
  });
});
