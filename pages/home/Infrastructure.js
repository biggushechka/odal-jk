export default function Infrastructure() {

    const infrastructure = ajaxRequest({url: "/ajax/Infrastructure.json"});

    var titleSection = (infrastructure.title != undefined && infrastructure.title != '') ? infrastructure.title : `<span style="color: red;">????????</span>`,
        descSection = (infrastructure.desc != undefined && infrastructure.desc != '') ? infrastructure.desc : `<span style="color: red;">????????</span>`;

    var html = `
    <section id="resid" class="residents__main" data-section="infrastructure">
        <div class="container">
            <div class="residents__cnt">
                <div class="number-count">
                    <strong>02</strong>
                </div>
                <div class="residents__info">
                    <span>инфраструктура</span>
                    <h2>${titleSection}</h2>
                    <div class="residents__fl">
                        <p>${descSection}</p>
                        <button type="button" class="button modal-callback" data-target="presentation">Скачать презентацию</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="residents__src">
            <div class="swiper residents__slider container" id="infrastructure-slider">
                <div class="swiper-wrapper">`;

                if (infrastructure.slides.length != 0) {
                    for (var item in infrastructure.slides) {
                        var slide = infrastructure.slides[item],
                            title = (slide.title != undefined && slide.title != '') ? slide.title : `<span style="color: red;">????????</span>`,
                            desc = (slide.desc != undefined && slide.desc != '') ? slide.desc : `<span style="color: red;">????????</span>`,
                            photo = (checkImageExists(slide.photo) != false && slide.photo != '') ? slide.photo : '/assets/img/photo-nan.jpg';

                        html += `
                        <div class="swiper-slide">
                            <div class="residents__block" style="background-image: url(${photo})">
                                <span></span>
                                <strong>${title}</strong>
                                <p>${desc}</p>
                            </div>
                        </div>`;
                    }
                } else {
                    html += `
                    <div class="swiper-slide">
                        <div class="residents__block" style="background-image: url('/assets/img/photo-nan.jpg')">
                            <span></span>
                            <strong>Error</strong>
                            <p></p>
                        </div>
                    </div>`;
                }

                html += `
                </div>
                <div class="residents__arrow">
                    <div class="residents-button-prev swiper-button-prev" id="infstr-btn-prev"></div>
                    <div class="residents-button-next swiper-button-next" id="infstr-btn-next"></div>
                    <div class="swiper-pagination" id="infstr-swiper-pagination"></div>
                </div>
            </div>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);


    new Swiper("#infrastructure-slider", {
        loop: true,
        spaceBetween: 30,
        breakpoints: {
            '1500': {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            '991': {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 15,
            },
            '768': {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            '570': {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            '480': {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            '320': {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
        },
        navigation: {
            nextEl: "#infstr-btn-prev",
            prevEl: "#infstr-btn-next",
        },
        pagination: {
            el: "#infstr-swiper-pagination",
        },
    });

    html.find('.modal-callback').on('click', function () {
        var target = $(this).data('target');
        ModalCallBack(target);
    });
}