// Smooth scroll to element from:
// https://gist.github.com/joshcanhelp/a3a669df80898d4097a1e2c01dea52c1

module.exports = function (scrollTo, scrollDuration) {
    if (typeof scrollTo === 'string') {
        let scrollToObj = document.querySelector(scrollTo);

        if (scrollToObj && typeof scrollToObj.getBoundingClientRect === 'function') {
            scrollTo = window.pageYOffset + scrollToObj.getBoundingClientRect().top;
        } else {
            throw 'error: No element found with the selector "' + scrollTo + '"';
        }
    } else if (typeof scrollTo !== 'number') {
        scrollTo = 0;
    }

    const anchorHeightAdjust = 30;
    if (scrollTo > anchorHeightAdjust) {
        scrollTo = scrollTo - anchorHeightAdjust;
    }

    if (typeof scrollDuration !== 'number' || scrollDuration < 0) {
        scrollDuration = 1000;
    }

    const cosParameter = (window.pageYOffset - scrollTo) / 2;
    let scrollCount = 0;
    let oldTimestamp = window.performance.now();

    function step(newTimestamp) {

        let tsDiff = newTimestamp - oldTimestamp;

        if (tsDiff > 100) {
            tsDiff = 30;
        }

        scrollCount += Math.PI / (scrollDuration / tsDiff);

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
(function () {
    if ('performance' in window === false) {
        window.performance = {};
    }

    Date.now = (Date.now || function () {  // thanks IE8
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