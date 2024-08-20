// Smooth scroll to element from:
// https://gist.github.com/joshcanhelp/a3a669df80898d4097a1e2c01dea52c1

module.exports = (scrollTo, scrollDuration) => {
  const duration = typeof scrollDuration !== 'number' || scrollDuration < 0 ? scrollDuration : 1000;
  let destination = scrollTo;

  if (typeof destination === 'string') {
    const scrollToObj = document.querySelector(destination);

    if (scrollToObj && typeof scrollToObj.getBoundingClientRect === 'function') {
      destination = window.pageYOffset + scrollToObj.getBoundingClientRect().top;
    }
  } else if (typeof destination !== 'number') {
    destination = 0;
  }

  const anchorHeightAdjust = 30;
  if (destination > anchorHeightAdjust) {
    destination -= anchorHeightAdjust;
  }

  const cosParameter = (window.pageYOffset - destination) / 2;
  let scrollCount = 0;
  let oldTimestamp = window.performance.now();

  function step(newTimestamp) {
    let tsDiff = newTimestamp - oldTimestamp;

    if (tsDiff > 100) {
      tsDiff = 30;
    }

    scrollCount += Math.PI / (duration / tsDiff);

    if (scrollCount >= Math.PI) {
      return;
    }

    const moveStep = Math.round(scrollTo + cosParameter + cosParameter * Math.cos(scrollCount));
    window.scrollTo(0, moveStep);
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
};

// Performance.now() polyfill from:
// https://gist.github.com/paulirish/5438650
(() => {
  if ('performance' in window === false) {
    window.performance = {};
  }

  // eslint-disable-next-line func-names
  Date.now = (Date.now || function () { // thanks IE8
    return new Date().getTime();
  });

  if ('now' in window.performance === false) {
    let nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }

    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  }
})();
