class Head {
  constructor(el) {
    this.node = document.createElement('img');
    this.node.setAttribute('src', 'src/images/Cartoon_snake.jpeg');
    this.node.setAttribute('id', 'head');
    el.appendChild(this.node);

    this.currentDirection = 'right';
    this.SPEED = 500;

    this.node.style.top = 0;
    this.node.style.left = 0;

    this.board = el;
    this.bodySegment = [];

    // declare new apple object here, this.apple = new Apple(el);
    this.apple = new Apple(el);

    setTimeout(this.move.bind(this), this.SPEED);
  }
  //method to alert player that game ended and resets the game
  gameover() {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
  }
  

  doesHeadMeetApple(appleLeft, appleTop, headLeft, headTop){
    if (headLeft === appleLeft && headTop === appleTop) {
      return true;
    }
    return false;
  }

  doesNodeMeetBody(nodeLeft, nodeTop) {
    for (let i = 0; i < this.bodySegment.length; i++) {
      if (this.bodySegment[i].node.style.top === (nodeTop + "px") && this.bodySegment[i].node.style.left === (nodeLeft + "px")) {
        return true;
      }
    }
    return false;
  }

  move() {
    const head = this.node;
    const direction = this.currentDirection;

    //we needed the measurements of each img so from lines 52 to 65 is use bringing in that information

    let headTop = Number(head.style.top.replace('px', ''));
    let headLeft = Number(head.style.left.replace('px', ''));

    // base case if head.left or head.top exceeds board.height and width or is less than 0,
    // we close the game (create a method that pops up a game over screen)
    const bStyle = getComputedStyle(this.board);
    const boardHeight = Number(bStyle.height.replace('px', ''));
    const boardWidth = Number(bStyle.width.replace('px',''));
    const boardLeft = Number(bStyle.left.replace('px', ''));
    const boardTop = Number(bStyle.top.replace('px', ''));

    const hStyle = getComputedStyle(head);
    const headWidth = Number(hStyle.width.replace('px',''));
    const headHeight = Number(hStyle.height.replace('px',''));

    // if head is outside the board, exit game
    if (headLeft + headWidth > boardLeft + boardWidth || headLeft < boardLeft ||
        headTop + headHeight > boardTop + boardHeight || headTop < boardTop) {
          console.log("exited game");
          // delete the green square
          return this.gameover();;
    }

    // if head touches body, exit game
    if (this.doesNodeMeetBody(headLeft, headTop)) {
      console.log("exited game");
      return this.gameover();

    }

    // if head location is the same as apple location
    // can we just use headwidth and headHeight since apple is the same size
    const appleDOM = document.getElementById('apple');
    const appleDOMStyle = getComputedStyle(appleDOM);
    const aStyle = this.apple.node.style;
    const appleLeft = Number(aStyle.left.replace('px',''));
    const appleTop = Number(aStyle.top.replace('px',''));
    const appleWidth = Number(appleDOMStyle.width.replace('px',''));
    const appleHeight = Number(appleDOMStyle.height.replace('px',''));

    if (this.doesHeadMeetApple(appleLeft, appleTop, headLeft, headTop)){
      //
      let newLeft = Math.floor(Math.random() * boardHeight / appleHeight) * appleHeight + "px";
      let newTop = Math.floor(Math.random() * boardHeight / appleHeight) * appleHeight + "px";

      console.log('head intersected apple');


      //create a while loop
         //condition: while the evaluated result of doesHeadMeetApple stand true w/ arg newLeft newTop headLeft headTop
         // need logic to spawn apple where body not
        while (this.doesHeadMeetApple (newLeft, newTop, headLeft, headTop) ||
               this.doesNodeMeetBody(appleLeft, appleTop)){
        newLeft = Math.floor(Math.random() * boardWidth / appleWidth) * appleWidth + "px";
        newTop = Math.floor(Math.random() * boardHeight / appleHeight) * appleHeight + "px";
      }

      this.apple.node.style.left = newLeft;
      this.apple.node.style.top = newTop;

      this.bodySegment.unshift(new Body(this.board, headLeft, headTop));

    } else if (this.bodySegment.length > 0) {
      // if not intersecting apple
        // the last body will move up to the position of the head is and then head will update using the keydown eventlistener after.
      let lastBody = this.bodySegment.pop();
      lastBody.node.style.top = headTop + 'px';
      lastBody.node.style.left = headLeft + 'px';
      this.bodySegment.unshift(lastBody);
    }



    if (direction === 'right') {
      head.style.left = `${(headLeft += 50)}px`;
    }

    if (direction === 'down') {
      head.style.top = `${(headTop += 50)}px`;
    }

    if (direction === 'left') {
      head.style.left = `${(headLeft -= 50)}px`
    }

    if (direction === 'up') {
      head.style.top = `${(headTop -= 50)}px`
    }

    setTimeout(this.move.bind(this), this.SPEED);
  }
}



