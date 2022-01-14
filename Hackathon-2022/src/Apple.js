class Apple {
  constructor(el) {
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'apple');
    this.node.setAttribute('src', 'src/images/apple.jpg');

    el.appendChild(this.node);

    this.node.style.left = '200px';
    this.node.style.top = '200px';

    this.hasIntersectedHead = false;
  }
}
