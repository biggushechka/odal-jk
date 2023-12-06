export default function Gallery() {

    const gallery = ajaxRequest({url: "/ajax/Gallery.json"});

    if (gallery.length == 0) return false;

    var html = `
    <section class="gallery-jk" data-section="gallery">
        <div class="wrapper-container">
            <div class="container">
                <div class="tabs-container">
                    <ul class="tabs-list">`;
                        for (var i in gallery) {
                            var active = (i == 0) ? 'active' : '';
                            html += `<li class="item ${active}" data-gallery="${i}">${gallery[i].title}</li>`;
                        }
                        html += `
                    </ul>
                </div>
            </div>
            <div class="photo-container"></div>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);

    itemGallery(0);

    html.find('.tabs-list .item').click(function () {
        var id_gallery = $(this).data('gallery');

        $(this).addClass('active').siblings().removeClass('active');
        itemGallery(id_gallery);
    });

    function itemGallery(slide) {

        html.find('.photo-container').html('');

        var galleryItem = `
        <div class="swiper slider-container" id="slider-gallery-${slide}">
            <div class="swiper-wrapper">`;
                for (var itemGallery in gallery[slide].photos) {
                    var photo = gallery[slide].photos[itemGallery],
                        url = (checkImageExists(photo.url) != false && photo.url != '') ? photo.url : '/assets/img/photo-nan.jpg';

                    galleryItem += `
                    <div class="swiper-slide">
                        <img src="${url}" class="image-slider">
                    </div>`;
                }
                galleryItem += `
            </div>
        </div>`;
        html.find('.photo-container').append(galleryItem);

        new Swiper("#slider-gallery-"+slide, {
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });
    }
}