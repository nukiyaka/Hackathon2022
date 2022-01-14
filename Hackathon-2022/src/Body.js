class Body {
    constructor(el, headLeft, headTop) {
      this.node = document.createElement('div');
      this.node.setAttribute('class', `body`);
      el.appendChild(this.node);

      this.node.style.left = headLeft +'px';
      this.node.style.top = headTop + 'px';
      }
}
