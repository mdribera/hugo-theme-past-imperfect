import Masonry from 'masonry-layout';

(((Masonry) => {
    let msnry;
    if (document.getElementsByClassName('masonry-grid').length) {
        msnry = new Masonry('.masonry-grid', {
            itemSelector: '.project',
            gutter: '.project-gutter-sizer',
            columnWidth: '.project',
            percentPosition: true,
            horizontalOrder: true,
        });
    }

    setTimeout(() => {
        msnry.layout();
    }, 500);
}))(Masonry);
