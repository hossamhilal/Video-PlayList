
  const FlowerLoader = (() => {
    const LEAF_SVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23.7 51.8" style="enable-background:new 0 0 23.7 51.8;" xml:space="preserve"><path d="M11.8,0c0,0-26.6,24.1,0,51.8C38.5,24.1,11.8,0,11.8,0z"/></svg>';
  
    const Selector = {
      CENTER: '.flowerCenter',
      LEAF: '.flowerLeaf',
      LEAF_INNER: '.flowerLeafInner',
      LEAVES: '.flowerLeaves' };
  
  
    const ClassName = {
      CENTER: 'flowerCenter',
      LEAF: 'flowerLeaf' };
  
  
    class FlowerLoader {
      constructor(element) {
        this._element = element;
        this._flowerLeaves = element.querySelector(Selector.LEAVES);
        this._numberOfLeaves = 7;
        this._rotation = 360 / this._numberOfLeaves;
        this._path = [
        { x: 15, y: 0 },
        { x: 16, y: -1 },
        { x: 17, y: 0 },
        { x: 16, y: 1 },
        { x: 15, y: 0 }];
  
        this._location = { x: this._path[0].x, y: this._path[0].y };
        this._tn1 = TweenMax.to(this._location, this._numberOfLeaves, {
          bezier: {
            curviness: 1.5,
            values: this._path },
  
          ease: Linear.easeNone });
  
  
        this._initialize();
      }
  
      _initialize() {
        this._addLeaves();
      }
  
      _addLeaves() {
        for (let i = 0; i < this._numberOfLeaves; i++) {
          const leafElement = document.createElement('div');
          leafElement.className = ClassName.LEAF;
          leafElement.innerHTML = `<div class="flowerLeafInner">${LEAF_SVG}</div>`;
          this._tn1.time(i);
  
          TweenMax.set(leafElement, {
            x: this._location.x - 11,
            y: this._location.y - 37,
            rotation: this._rotation * i - 90 });
  
  
          this._flowerLeaves.appendChild(leafElement);
        }
  
        this._animate();
      }
  
      _animate() {
        const leaves = this._flowerLeaves.querySelectorAll(Selector.LEAF_INNER);
        const center = this._element.querySelector(Selector.CENTER);
  
        const timeline = new TimelineMax({
          onComplete: () => {
            timeline.restart(true);
          } });
  
  
        timeline.
        add(
        TweenMax.fromTo(center, 1, {
          scale: 0 },
        {
          scale: 1,
          ease: Elastic.easeOut.config(1.1, .75) }),
        0).
  
        add(
        TweenMax.staggerTo(leaves, 1, {
          scale: 1,
          ease: Elastic.easeOut.config(1.1, .75) },
        .2), 0.3).
  
        add(
        TweenMax.to(leaves, 0.3, {
          scale: 1.25,
          ease: Elastic.easeOut.config(1.5, 1) })).
  
  
        add(
        TweenMax.to(this._element.querySelector(Selector.LEAVES), 1, {
          duration: 1.5,
          rotation: 360,
          ease: Expo.easeInOut }),
        1.7).
  
        add(
        TweenMax.to(leaves, 0.5, {
          scale: 0,
          ease: Elastic.easeInOut.config(1.1, 0.75) })).
  
  
        add(
        TweenMax.to(center, 0.5, {
          scale: 0,
          ease: Elastic.easeInOut.config(1.1, 0.75) }),
        '-=0.37');
  
      }}
  
  
    return new FlowerLoader(document.body.querySelector('.flower'));
  })();