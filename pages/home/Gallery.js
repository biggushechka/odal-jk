export default function Gallery() {

    let gallery = XMLHttpRequestAJAX({
        url: "https://otal-estate.ru/api/site/content/get",
        method: "GET",
        body: {
            content: "gallery"
        }
    });

    if (gallery.code === 200) {
        gallery = gallery.data;
    } else {
        return false;
    }

    console.log("gallery", gallery)

    var html = `
    <section class="gallery-jk" data-section="gallery">
        <div class="wrapper-container">
            <div class="container">
                <div class="tabs-container">
                    <ul class="tabs-list">`;
                        for (var i in gallery) {
                            html += `<li class="item" data-gallery="${i}">${gallery[i].title}</li>`;
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

    html.find(".tabs-list .item").eq(0).addClass('active');

    itemGallery();

    html.find('.tabs-list .item').click(function () {
        var id_gallery = $(this).data('gallery');

        $(this).addClass('active').siblings().removeClass('active');
        itemGallery(id_gallery);
    });

    function itemGallery(tab) {
        if (tab === undefined) tab = html.find(".tabs-list .item.active").attr("data-gallery");

        html.find('.photo-container').html('');

        var galleryItem = `
        <div class="swiper slider-container" id="slider-gallery-${tab}">
            <div class="swiper-wrapper">`;
                for (var itemGallery in gallery[tab].photo) {
                    var photo = gallery[tab].photo[itemGallery];

                    galleryItem += `
                    <div class="swiper-slide">
                        <img src="${photo}" class="image-slider">
                    </div>`;
                }
                galleryItem += `
            </div>
        </div>`;
        html.find('.photo-container').append(galleryItem);

        new Swiper("#slider-gallery-"+tab, {
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });
    }
}