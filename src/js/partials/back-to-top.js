import scrollTo from './scroll-to';

(((scrollToPos) => {
  // browser window scroll (in pixels) after which the "back to top" link is shown
  const offset = 300;
  // duration of the top scrolling animation (in ms)
  const scrollDuration = 500;
  // where to look for scrollTop
  const supportPageOffset = window.pageXOffset !== undefined;

  // initializations
  let scrollTop = 0;
  let isActive = false;

  // get the back-to-top element
  const backToTop = document.getElementById('back-to-top');

  // listen for clicks on the scroll-to-top element
  backToTop.addEventListener('click', () => {
    scrollToPos(0, scrollDuration);
  }, false);

  // show or hide the scroll-to-top element
  window.addEventListener('scroll', () => {
    scrollTop = supportPageOffset ? window.pageYOffset : document.body.scrollTop;
    isActive = backToTop.classList.contains('is-active');

    if (scrollTop > offset && !isActive) {
      backToTop.classList.add('is-active');
    } else if (scrollTop < offset && isActive) {
      backToTop.classList.remove('is-active');
    }
  }, false);
}))(scrollTo);
