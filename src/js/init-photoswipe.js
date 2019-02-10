import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/src/css/default-skin/default-skin.scss';
import 'photoswipe/src/css/main.scss';

(((PhotoSwipe, PhotoSwipeUI_Default) => {
    const parseThumbnailElements = function () {
        const thumbElements = document.querySelectorAll('.pswp-gallery figure');
        const items = [];

        for (let i = 0; i < thumbElements.length; i++) {
            const figureEl = thumbElements[i].children; // <figure> element
            const linkEl = figureEl[0]; // <a> element
            const size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            const item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
            };


            if (figureEl.length > 1) {
                // <figcaption> content
                item.title = figureEl[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                item.msrc = linkEl.getAttribute('data-msrc');
            }

            // save link to element for getThumbBoundsFn
            item.el = linkEl;

            items.push(item);
        }

        return items;
    };

    // triggers when user clicks on thumbnail
    const onThumbnailsClick = function (event) {

        // find the link of the clicked photo
        const clickedLink = event.target.parentNode.getAttribute('href');

        if (!clickedLink) {
            return;
        }
        event.preventDefault();

        for (let i = 0; i < galleryItems.length; i++) {
            if (galleryItems[i].src === clickedLink) {
                openPhotoSwipe(i);
                break;
            }
        }
    };

    const openPhotoSwipe = function (index, disableAnimation) {
        const pswpElement = document.querySelectorAll('.pswp')[0];

        const options = {};

        options.index = parseInt(index, 10);
        if (isNaN(options.index)) {
            return;
        }

        // See Options -> getThumbBoundsFn section of documentation for more info
        options.getThumbBoundsFn = function (index) {
            const item = galleryItems[index];
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            const rect = item.el.getBoundingClientRect();
            const ratio = item.w / item.h;

            // is the image a wider aspect ratio than the standard 4:3 thumbnail view?
            if (item.w >= ((item.h / 4) * 3)) {
                const realWidth = rect.height * ratio;
                const leftHang = (realWidth - rect.width) / 2;

                return { x: rect.left - leftHang, y: rect.top + pageYScroll, w: realWidth };
            } else {
                const realHeight = rect.width / ratio;
                const topHang = (realHeight - rect.height) / 2;

                return { x: rect.left, y: rect.top - topHang + pageYScroll, w: rect.width };
            }

        };

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        options.showHideOpacity = true;
        options.history = false;
        options.bgOpacity = 0.9;
        options.showAnimationDuration = 800;

        // Pass data to PhotoSwipe and initialize it
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, galleryItems, options);

        gallery.init();
    };

    // construct the item objects to pass to PhotoSwipe
    const galleryItems = parseThumbnailElements();

    // loop through all gallery elements and bind events
    const galleryElements = document.querySelectorAll('.pswp-gallery');

    for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].onclick = onThumbnailsClick;
    }
}))(PhotoSwipe, PhotoSwipeUI_Default);
